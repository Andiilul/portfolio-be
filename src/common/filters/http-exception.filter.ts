import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface SupabaseLikeError {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status = this.getStatus(exception);
    const error = this.getErrorPayload(exception, status);

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      error,
    });
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    const supabaseError = exception as SupabaseLikeError;

    if (supabaseError?.code === '23505') {
      return HttpStatus.CONFLICT;
    }

    if (supabaseError?.code === '23503') {
      return HttpStatus.BAD_REQUEST;
    }

    if (supabaseError?.message?.includes('fetch failed')) {
      return HttpStatus.BAD_GATEWAY;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorPayload(exception: unknown, status: number) {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'string') {
        return {
          message: response,
        };
      }

      return response;
    }

    const supabaseError = exception as SupabaseLikeError;

    return {
      message:
        supabaseError?.message ?? 'Unexpected server error.',
      code: supabaseError?.code,
      details:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? undefined
          : supabaseError?.details,
      hint: supabaseError?.hint,
    };
  }
}

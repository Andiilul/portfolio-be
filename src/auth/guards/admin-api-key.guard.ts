import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const configuredApiKey = this.configService.get<string>('ADMIN_API_KEY');

    if (!configuredApiKey) {
      throw new UnauthorizedException('Admin API key is not configured.');
    }

    const receivedApiKey = this.getApiKeyFromRequest(request);

    if (!receivedApiKey || receivedApiKey !== configuredApiKey) {
      throw new UnauthorizedException('Invalid admin API key.');
    }

    return true;
  }

  private getApiKeyFromRequest(request: Request): string | undefined {
    const authorization = request.headers.authorization;

    if (authorization?.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '').trim();
    }

    const apiKey = request.headers['x-admin-api-key'];

    if (Array.isArray(apiKey)) {
      return apiKey[0];
    }

    return apiKey;
  }
}

import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuth } from '../auth/decorators/admin-auth.decorator';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { MediaFilesService } from './media-files.service';
import type { UploadFile } from './interfaces/upload-file.interface';

@ApiTags('Media Files')
@Controller('admin/media-files')
@AdminAuth()
export class MediaFilesController {
  constructor(private readonly mediaFilesService: MediaFilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a media file to Supabase Storage' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    example: 'projects',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiCreatedResponse({ description: 'Media file uploaded successfully.' })
  async upload(
    @UploadedFile() file: UploadFile,
    @Query('folder') folder?: string,
  ) {
    const mediaFile = await this.mediaFilesService.upload(file, folder);

    return createApiResponse('Media file uploaded successfully.', mediaFile);
  }
}

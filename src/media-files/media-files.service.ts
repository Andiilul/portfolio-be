import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { SupabaseService } from '../supabase/supabase.service';
import { MediaFile } from './interfaces/media-file.interface';
import { UploadFile } from './interfaces/upload-file.interface';
import { mapMediaFileRow } from './media-file.mapper';

@Injectable()
export class MediaFilesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async upload(file: UploadFile, folder = 'uploads'): Promise<MediaFile> {
    if (!file) {
      throw new BadRequestException('File is required.');
    }

    const bucket = this.configService.get<string>(
      'SUPABASE_STORAGE_BUCKET',
      'media',
    );
    const safeFolder = this.sanitizePathSegment(folder);
    const fileName = this.buildFileName(file.originalname);
    const filePath = `${safeFolder}/${fileName}`;

    const { error: uploadError } = await this.supabaseService.client.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = this.supabaseService.client.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const { data, error } = await this.supabaseService.client
      .from('media_files')
      .insert({
        file_name: file.originalname,
        file_url: publicUrlData.publicUrl,
        mime_type: file.mimetype,
        size: file.size,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return mapMediaFileRow(data);
  }

  private buildFileName(originalName: string): string {
    const extension = originalName.includes('.')
      ? originalName.substring(originalName.lastIndexOf('.')).toLowerCase()
      : '';

    return `${randomUUID()}${extension}`;
  }

  private sanitizePathSegment(value: string): string {
    return (
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9/_-]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'uploads'
    );
  }
}

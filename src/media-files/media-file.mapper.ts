import {
  MediaFile,
  MediaFileRow,
} from './interfaces/media-file.interface';

export const mapMediaFileRow = (row: MediaFileRow): MediaFile => ({
  id: row.id,
  fileName: row.file_name,
  fileUrl: row.file_url,
  mimeType: row.mime_type,
  size: row.size,
  createdAt: row.created_at,
});

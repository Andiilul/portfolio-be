import {
  ISODateString,
  Nullable,
  UUID,
} from '../../common/types/database.types';

export interface MediaFile {
  id: UUID;
  fileName: string;
  fileUrl: string;
  mimeType: Nullable<string>;
  size: Nullable<number>;
  createdAt: ISODateString;
}

export interface MediaFileRow {
  id: UUID;
  file_name: string;
  file_url: string;
  mime_type: Nullable<string>;
  size: Nullable<number>;
  created_at: ISODateString;
}

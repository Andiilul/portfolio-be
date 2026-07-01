import {
  ISODateString,
  Nullable,
  UUID,
} from '../../common/types/database.types';
import {
  MediaFile,
  MediaFileRow,
} from '../../media-files/interfaces/media-file.interface';

export interface ExperienceType {
  id: UUID;
  name: string;
  description: Nullable<string>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ExperienceTypeRow {
  id: UUID;
  name: string;
  description: Nullable<string>;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export interface Experience {
  id: UUID;
  title: string;
  organization: Nullable<string>;
  description: string;
  type: ExperienceType;
  startDate: ISODateString;
  endDate: Nullable<ISODateString>;
  isCurrent: boolean;
  location: Nullable<string>;
  attachment: Nullable<MediaFile>;
  displayOrder: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ExperienceRow {
  id: UUID;
  title: string;
  organization: Nullable<string>;
  description: string;
  type_id: UUID;
  type?: ExperienceTypeRow;
  start_date: ISODateString;
  end_date: Nullable<ISODateString>;
  is_current: boolean;
  location: Nullable<string>;
  attachment_id: Nullable<UUID>;
  attachment?: Nullable<MediaFileRow>;
  display_order: Nullable<number>;
  created_at: ISODateString;
  updated_at: ISODateString;
}

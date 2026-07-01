import {
  ISODateString,
  LinkType,
  Nullable,
  UUID,
} from '../../common/types/database.types';
import { MediaFile, MediaFileRow } from '../../media-files/interfaces/media-file.interface';

export interface ProfileLink {
  id: UUID;
  type: LinkType;
  label: string;
  url: string;
  displayOrder: number;
  createdAt: ISODateString;
}

export interface ProfileLinkRow {
  id: UUID;
  profile_id: UUID;
  type: LinkType;
  label: string;
  url: string;
  display_order: Nullable<number>;
  created_at: ISODateString;
}

export interface Profile {
  id: UUID;
  name: string;
  nickname: Nullable<string>;
  headline: Nullable<string>;
  bio: Nullable<string>;
  summary: Nullable<string>;
  email: Nullable<string>;
  phone: Nullable<string>;
  location: Nullable<string>;
  avatar: Nullable<MediaFile>;
  resume: Nullable<MediaFile>;
  links: ProfileLink[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ProfileRow {
  id: UUID;
  name: string;
  nickname: Nullable<string>;
  headline: Nullable<string>;
  bio: Nullable<string>;
  summary: Nullable<string>;
  email: Nullable<string>;
  phone: Nullable<string>;
  location: Nullable<string>;
  avatar_id: Nullable<UUID>;
  resume_id: Nullable<UUID>;
  avatar?: Nullable<MediaFileRow>;
  resume?: Nullable<MediaFileRow>;
  profile_links?: ProfileLinkRow[];
  created_at: ISODateString;
  updated_at: ISODateString;
}

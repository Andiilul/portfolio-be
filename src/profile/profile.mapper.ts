import { mapMediaFileRow } from '../media-files/media-file.mapper';
import {
  Profile,
  ProfileLink,
  ProfileLinkRow,
  ProfileRow,
} from './interfaces/profile.interface';

export const mapProfileLinkRow = (row: ProfileLinkRow): ProfileLink => ({
  id: row.id,
  type: row.type,
  label: row.label,
  url: row.url,
  displayOrder: row.display_order ?? 0,
  createdAt: row.created_at,
});

export const mapProfileRow = (row: ProfileRow): Profile => ({
  id: row.id,
  name: row.name,
  nickname: row.nickname,
  headline: row.headline,
  bio: row.bio,
  summary: row.summary,
  email: row.email,
  phone: row.phone,
  location: row.location,
  avatar: row.avatar ? mapMediaFileRow(row.avatar) : null,
  resume: row.resume ? mapMediaFileRow(row.resume) : null,
  links: (row.profile_links ?? []).map(mapProfileLinkRow),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

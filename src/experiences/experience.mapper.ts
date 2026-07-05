import { mapMediaFileRow } from '../media-files/media-file.mapper';
import {
  Experience,
  ExperienceRow,
  ExperienceType,
  ExperienceTypeRow,
} from './interfaces/experience.interface';

export const mapExperienceTypeRow = (
  row: ExperienceTypeRow,
): ExperienceType => ({
  id: row.id,
  name: row.name,
  description: row.description,
  displayOrder: row.display_order ?? 0,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const mapExperienceRow = (row: ExperienceRow): Experience => ({
  id: row.id,
  title: row.title,
  organization: row.organization,
  description: row.description,
  type: row.type
    ? mapExperienceTypeRow(row.type)
    : {
        id: row.type_id,
        name: 'Other',
        description: null,
        displayOrder: 0,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
  startDate: row.start_date,
  endDate: row.end_date,
  isCurrent: row.is_current,
  location: row.location,
  attachment: row.attachment ? mapMediaFileRow(row.attachment) : null,
  displayOrder: row.display_order ?? 0,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

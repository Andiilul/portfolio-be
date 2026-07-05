import {
  Technology,
  TechnologyRow,
} from './interfaces/technology.interface';

export const mapTechnologyRow = (row: TechnologyRow): Technology => ({
  id: row.id,
  name: row.name,
  description: row.description,
  displayOrder: row.display_order ?? 0,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

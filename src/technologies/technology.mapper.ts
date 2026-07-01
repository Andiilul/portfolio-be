import {
  Technology,
  TechnologyRow,
} from './interfaces/technology.interface';

export const mapTechnologyRow = (row: TechnologyRow): Technology => ({
  id: row.id,
  name: row.name,
  description: row.description,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

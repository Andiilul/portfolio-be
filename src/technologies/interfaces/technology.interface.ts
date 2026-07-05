import {
  ISODateString,
  Nullable,
  UUID,
} from '../../common/types/database.types';

export interface Technology {
  id: UUID;
  name: string;
  description: Nullable<string>;
  displayOrder: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface TechnologyRow {
  id: UUID;
  name: string;
  description: Nullable<string>;
  display_order: Nullable<number>;
  created_at: ISODateString;
  updated_at: ISODateString;
}

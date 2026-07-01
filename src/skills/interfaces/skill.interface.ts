import {
  ISODateString,
  Nullable,
  UUID,
} from '../../common/types/database.types';

export interface SkillCategory {
  id: UUID;
  name: string;
  description: Nullable<string>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface SkillCategoryRow {
  id: UUID;
  name: string;
  description: Nullable<string>;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export interface Skill {
  id: UUID;
  name: string;
  description: Nullable<string>;
  category: SkillCategory;
  proficiencyLevel: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface SkillRow {
  id: UUID;
  name: string;
  description: Nullable<string>;
  category_id: UUID;
  category?: SkillCategoryRow;
  proficiency_level: number;
  created_at: ISODateString;
  updated_at: ISODateString;
}

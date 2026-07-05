import {
  ISODateString,
  Nullable,
  PortfolioStatus,
  UUID,
} from '../../common/types/database.types';
import {
  Experience,
  ExperienceRow,
} from '../../experiences/interfaces/experience.interface';
import { Project, ProjectRow } from '../../projects/interfaces/project.interface';
import { Skill, SkillRow } from '../../skills/interfaces/skill.interface';

export interface Portfolio {
  id: UUID;
  slug: string;
  title: string;
  headline: string;
  description: Nullable<string>;
  summary: Nullable<string>;
  targetRole: Nullable<string>;
  status: PortfolioStatus;
  isDefault: boolean;
  displayOrder: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  publishedAt: Nullable<ISODateString>;
}

export interface PortfolioRow {
  id: UUID;
  slug: string;
  title: string;
  headline: string;
  description: Nullable<string>;
  summary: Nullable<string>;
  target_role: Nullable<string>;
  status: PortfolioStatus;
  is_default: Nullable<boolean>;
  display_order: Nullable<number>;
  created_at: ISODateString;
  updated_at: ISODateString;
  published_at: Nullable<ISODateString>;
}

export interface PortfolioProject {
  portfolioId: UUID;
  projectId: UUID;
  project: Project;
  displayOrder: number;
  featured: boolean;
  customTitle: Nullable<string>;
  customSummary: Nullable<string>;
}

export interface PortfolioProjectRow {
  portfolio_id: UUID;
  project_id: UUID;
  project?: ProjectRow;
  display_order: Nullable<number>;
  featured: Nullable<boolean>;
  custom_title: Nullable<string>;
  custom_summary: Nullable<string>;
}

export interface PortfolioSkill {
  portfolioId: UUID;
  skillId: UUID;
  skill: Skill;
  displayOrder: number;
  featured: boolean;
  customDescription: Nullable<string>;
}

export interface PortfolioSkillRow {
  portfolio_id: UUID;
  skill_id: UUID;
  skill?: SkillRow;
  display_order: Nullable<number>;
  featured: Nullable<boolean>;
  custom_description: Nullable<string>;
}

export interface PortfolioExperience {
  portfolioId: UUID;
  experienceId: UUID;
  experience: Experience;
  displayOrder: number;
  featured: boolean;
  customDescription: Nullable<string>;
}

export interface PortfolioExperienceRow {
  portfolio_id: UUID;
  experience_id: UUID;
  experience?: ExperienceRow;
  display_order: Nullable<number>;
  featured: Nullable<boolean>;
  custom_description: Nullable<string>;
}

export interface PortfolioDetail extends Portfolio {
  projects: PortfolioProject[];
  skills: PortfolioSkill[];
  experiences: PortfolioExperience[];
}

export interface PortfolioDetailRow extends PortfolioRow {
  portfolio_projects?: PortfolioProjectRow[];
  portfolio_skills?: PortfolioSkillRow[];
  portfolio_experiences?: PortfolioExperienceRow[];
}

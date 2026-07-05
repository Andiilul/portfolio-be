import {
  ISODateString,
  Nullable,
  ProjectStatus,
  UUID,
} from '../../common/types/database.types';
import {
  MediaFile,
  MediaFileRow,
} from '../../media-files/interfaces/media-file.interface';
import {
  Technology,
  TechnologyRow,
} from '../../technologies/interfaces/technology.interface';

export interface Project {
  id: UUID;
  title: string;
  slug: string;
  summary: string;
  description: Nullable<string>;
  githubUrl: Nullable<string>;
  liveUrl: Nullable<string>;
  image: Nullable<MediaFile>;
  status: ProjectStatus;
  displayOrder: number;
  technologies: Technology[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ProjectRow {
  id: UUID;
  title: string;
  slug: string;
  summary: string;
  description: Nullable<string>;
  github_url: Nullable<string>;
  live_url: Nullable<string>;
  image_id: Nullable<UUID>;
  image?: Nullable<MediaFileRow>;
  status: ProjectStatus;
  display_order: Nullable<number>;
  project_technologies?: ProjectTechnologyRow[];
  created_at: ISODateString;
  updated_at: ISODateString;
}

export interface ProjectTechnology {
  projectId: UUID;
  technologyId: UUID;
}

export interface ProjectTechnologyRow {
  project_id: UUID;
  technology_id: UUID;
  technology?: TechnologyRow;
}

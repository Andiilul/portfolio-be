import { mapMediaFileRow } from '../media-files/media-file.mapper';
import { mapTechnologyRow } from '../technologies/technology.mapper';
import { Project, ProjectRow } from './interfaces/project.interface';

export const mapProjectRow = (row: ProjectRow): Project => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  summary: row.summary,
  description: row.description,
  githubUrl: row.github_url,
  liveUrl: row.live_url,
  image: row.image ? mapMediaFileRow(row.image) : null,
  status: row.status,
  technologies: (row.project_technologies ?? [])
    .map((projectTechnology) => projectTechnology.technology)
    .filter((technology) => Boolean(technology))
    .map((technology) => mapTechnologyRow(technology!)),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

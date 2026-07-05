import { mapExperienceRow } from '../experiences/experience.mapper';
import { mapProjectRow } from '../projects/project.mapper';
import { mapSkillRow } from '../skills/skill.mapper';
import {
  Portfolio,
  PortfolioDetail,
  PortfolioExperienceRow,
  PortfolioProjectRow,
  PortfolioRow,
  PortfolioSkillRow,
} from './interfaces/portfolio.interface';

export const mapPortfolioRow = (row: PortfolioRow): Portfolio => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  headline: row.headline,
  description: row.description,
  summary: row.summary,
  targetRole: row.target_role,
  status: row.status,
  isDefault: row.is_default ?? false,
  displayOrder: row.display_order ?? 0,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  publishedAt: row.published_at,
});

export const mapPortfolioProjectRow = (row: PortfolioProjectRow) => ({
  portfolioId: row.portfolio_id,
  projectId: row.project_id,
  project: mapProjectRow(row.project!),
  displayOrder: row.display_order ?? 0,
  featured: row.featured ?? false,
  customTitle: row.custom_title,
  customSummary: row.custom_summary,
});

export const mapPortfolioSkillRow = (row: PortfolioSkillRow) => ({
  portfolioId: row.portfolio_id,
  skillId: row.skill_id,
  skill: mapSkillRow(row.skill!),
  displayOrder: row.display_order ?? 0,
  featured: row.featured ?? false,
  customDescription: row.custom_description,
});

export const mapPortfolioExperienceRow = (
  row: PortfolioExperienceRow,
) => ({
  portfolioId: row.portfolio_id,
  experienceId: row.experience_id,
  experience: mapExperienceRow(row.experience!),
  displayOrder: row.display_order ?? 0,
  featured: row.featured ?? false,
  customDescription: row.custom_description,
});

export const buildPortfolioDetail = (
  portfolio: PortfolioRow,
  projects: PortfolioProjectRow[],
  skills: PortfolioSkillRow[],
  experiences: PortfolioExperienceRow[],
): PortfolioDetail => ({
  ...mapPortfolioRow(portfolio),
  projects: projects
    .filter((project) => Boolean(project.project))
    .map(mapPortfolioProjectRow),
  skills: skills.filter((skill) => Boolean(skill.skill)).map(mapPortfolioSkillRow),
  experiences: experiences
    .filter((experience) => Boolean(experience.experience))
    .map(mapPortfolioExperienceRow),
});

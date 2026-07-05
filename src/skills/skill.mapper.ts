import {
  Skill,
  SkillCategory,
  SkillCategoryRow,
  SkillRow,
} from './interfaces/skill.interface';

export const mapSkillCategoryRow = (
  row: SkillCategoryRow,
): SkillCategory => ({
  id: row.id,
  name: row.name,
  description: row.description,
  displayOrder: row.display_order ?? 0,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const mapSkillRow = (row: SkillRow): Skill => ({
  id: row.id,
  name: row.name,
  description: row.description,
  category: row.category
    ? mapSkillCategoryRow(row.category)
    : {
        id: row.category_id,
        name: 'Uncategorized',
        description: null,
        displayOrder: 0,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
  proficiencyLevel: row.proficiency_level,
  displayOrder: row.display_order ?? 0,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

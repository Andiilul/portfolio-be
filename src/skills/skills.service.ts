import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Skill, SkillCategory } from './interfaces/skill.interface';
import { mapSkillCategoryRow, mapSkillRow } from './skill.mapper';

@Injectable()
export class SkillsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Skill[]> {
    const { data, error } = await this.supabaseService.client
      .from('skills')
      .select(
        `
          *,
          category:skill_categories(*)
        `,
      )
      .order('proficiency_level', { ascending: false })
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapSkillRow);
  }

  async findCategories(): Promise<SkillCategory[]> {
    const { data, error } = await this.supabaseService.client
      .from('skill_categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapSkillCategoryRow);
  }
}

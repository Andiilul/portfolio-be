import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createPaginatedData } from '../common/helpers/api-response.helper';
import { PaginatedData } from '../common/types/pagination.type';
import { SupabaseService } from '../supabase/supabase.service';
import { Skill, SkillCategory } from './interfaces/skill.interface';
import { mapSkillCategoryRow, mapSkillRow } from './skill.mapper';

@Injectable()
export class SkillsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(query: PaginationQueryDto): Promise<PaginatedData<Skill>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await this.supabaseService.client
      .from('skills')
      .select(
        `
          *,
          category:skill_categories(*)
        `,
        { count: 'exact' },
      )
      .order('display_order', { ascending: true })
      .order('proficiency_level', { ascending: false })
      .order('name', { ascending: true })
      .range(from, to);

    if (error) {
      throw error;
    }

    return createPaginatedData(
      (data ?? []).map(mapSkillRow),
      page,
      limit,
      count ?? 0,
    );
  }

  async findCategories(): Promise<SkillCategory[]> {
    const { data, error } = await this.supabaseService.client
      .from('skill_categories')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapSkillCategoryRow);
  }
}

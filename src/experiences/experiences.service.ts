import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createPaginatedData } from '../common/helpers/api-response.helper';
import { PaginatedData } from '../common/types/pagination.type';
import { SupabaseService } from '../supabase/supabase.service';
import {
  Experience,
  ExperienceType,
} from './interfaces/experience.interface';
import { mapExperienceRow, mapExperienceTypeRow } from './experience.mapper';

@Injectable()
export class ExperiencesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(query: PaginationQueryDto): Promise<PaginatedData<Experience>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await this.supabaseService.client
      .from('experiences')
      .select(
        `
          *,
          type:experience_types(*),
          attachment:media_files!experiences_attachment_id_fkey(*)
        `,
        { count: 'exact' },
      )
      .order('display_order', { ascending: true })
      .order('start_date', { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    return createPaginatedData(
      (data ?? []).map(mapExperienceRow),
      page,
      limit,
      count ?? 0,
    );
  }

  async findTypes(): Promise<ExperienceType[]> {
    const { data, error } = await this.supabaseService.client
      .from('experience_types')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapExperienceTypeRow);
  }
}

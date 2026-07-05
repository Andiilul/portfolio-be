import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createPaginatedData } from '../common/helpers/api-response.helper';
import { PaginatedData } from '../common/types/pagination.type';
import { SupabaseService } from '../supabase/supabase.service';
import { Technology } from './interfaces/technology.interface';
import { mapTechnologyRow } from './technology.mapper';

@Injectable()
export class TechnologiesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedData<Technology>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await this.supabaseService.client
      .from('technologies')
      .select('*', { count: 'exact' })
      .order('display_order', { ascending: true })
      .order('name', { ascending: true })
      .range(from, to);

    if (error) {
      throw error;
    }

    return createPaginatedData(
      (data ?? []).map(mapTechnologyRow),
      page,
      limit,
      count ?? 0,
    );
  }
}

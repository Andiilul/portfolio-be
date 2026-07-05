import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createPaginatedData } from '../common/helpers/api-response.helper';
import { PaginatedData } from '../common/types/pagination.type';
import { SupabaseService } from '../supabase/supabase.service';
import { Project } from './interfaces/project.interface';
import { mapProjectRow } from './project.mapper';

@Injectable()
export class ProjectsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(query: PaginationQueryDto): Promise<PaginatedData<Project>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await this.supabaseService.client
      .from('projects')
      .select(
        `
          *,
          image:media_files!projects_image_id_fkey(*),
          project_technologies(
            *,
            technology:technologies(*)
          )
        `,
        { count: 'exact' },
      )
      .eq('status', 'published')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    return createPaginatedData(
      (data ?? []).map(mapProjectRow),
      page,
      limit,
      count ?? 0,
    );
  }

  async findBySlug(slug: string): Promise<Project> {
    const { data, error } = await this.supabaseService.client
      .from('projects')
      .select(
        `
          *,
          image:media_files!projects_image_id_fkey(*),
          project_technologies(
            *,
            technology:technologies(*)
          )
        `,
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new NotFoundException(`Project with slug "${slug}" was not found.`);
    }

    return mapProjectRow(data);
  }
}

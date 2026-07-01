import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Project } from './interfaces/project.interface';
import { mapProjectRow } from './project.mapper';

@Injectable()
export class ProjectsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Project[]> {
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
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapProjectRow);
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

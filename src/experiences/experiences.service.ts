import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import {
  Experience,
  ExperienceType,
} from './interfaces/experience.interface';
import { mapExperienceRow, mapExperienceTypeRow } from './experience.mapper';

@Injectable()
export class ExperiencesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Experience[]> {
    const { data, error } = await this.supabaseService.client
      .from('experiences')
      .select(
        `
          *,
          type:experience_types(*),
          attachment:media_files!experiences_attachment_id_fkey(*)
        `,
      )
      .order('display_order', { ascending: true })
      .order('start_date', { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapExperienceRow);
  }

  async findTypes(): Promise<ExperienceType[]> {
    const { data, error } = await this.supabaseService.client
      .from('experience_types')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapExperienceTypeRow);
  }
}

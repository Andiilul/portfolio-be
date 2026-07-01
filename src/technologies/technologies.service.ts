import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Technology } from './interfaces/technology.interface';
import { mapTechnologyRow } from './technology.mapper';

@Injectable()
export class TechnologiesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<Technology[]> {
    const { data, error } = await this.supabaseService.client
      .from('technologies')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(mapTechnologyRow);
  }
}

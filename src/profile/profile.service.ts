import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Profile } from './interfaces/profile.interface';
import { mapProfileRow } from './profile.mapper';

@Injectable()
export class ProfileService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findDefault(): Promise<Profile> {
    const { data, error } = await this.supabaseService.client
      .from('profiles')
      .select(
        `
          *,
          avatar:media_files!profiles_avatar_id_fkey(*),
          resume:media_files!profiles_resume_id_fkey(*),
          profile_links(*)
        `,
      )
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new NotFoundException('Profile has not been created yet.');
    }

    return mapProfileRow(data);
  }
}

import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class HealthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  getApiHealth() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  async getSupabaseHealth() {
    const startedAt = Date.now();
    const { count, error } = await this.supabaseService.client
      .from('profiles')
      .select('id', { count: 'exact', head: true });

    if (error) {
      return {
        status: 'error',
        connected: false,
        message: error.message,
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: 'ok',
      connected: true,
      profilesCount: count ?? 0,
      latencyMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    };
  }
}

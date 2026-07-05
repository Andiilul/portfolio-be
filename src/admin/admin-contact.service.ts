import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createPaginatedData } from '../common/helpers/api-response.helper';
import { PaginatedData } from '../common/types/pagination.type';
import { mapContactMessageRow } from '../contact/contact-message.mapper';
import { ContactMessage } from '../contact/interfaces/contact-message.interface';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateContactMessageStatusDto } from './dto/update-contact-message-status.dto';

@Injectable()
export class AdminContactService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedData<ContactMessage>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await this.supabaseService.client
      .from('contact_messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return createPaginatedData(
      (data ?? []).map(mapContactMessageRow),
      page,
      limit,
      count ?? 0,
    );
  }

  async updateStatus(
    id: string,
    dto: UpdateContactMessageStatusDto,
  ): Promise<ContactMessage> {
    const { data, error } = await this.supabaseService.client
      .from('contact_messages')
      .update({ status: dto.status })
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      throw new NotFoundException(`Contact message "${id}" was not found.`);
    }

    return mapContactMessageRow(data);
  }
}

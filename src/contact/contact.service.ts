import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { mapContactMessageRow } from './contact-message.mapper';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { ContactMessage } from './interfaces/contact-message.interface';

@Injectable()
export class ContactService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(dto: CreateContactMessageDto): Promise<ContactMessage> {
    const { data, error } = await this.supabaseService.client
      .from('contact_messages')
      .insert({
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
        portfolio_slug: dto.portfolioSlug ?? null,
      })
      .select('*')
      .single();

    if (error) throw error;

    return mapContactMessageRow(data);
  }
}

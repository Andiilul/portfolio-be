import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

type OrderedTable =
  | 'technologies'
  | 'projects'
  | 'skill_categories'
  | 'skills'
  | 'experience_types'
  | 'experiences'
  | 'portfolios';

@Injectable()
export class AdminOrderService {
  private readonly orderedTables = new Set<OrderedTable>([
    'technologies',
    'projects',
    'skill_categories',
    'skills',
    'experience_types',
    'experiences',
    'portfolios',
  ]);

  constructor(private readonly supabaseService: SupabaseService) {}

  async getNextDisplayOrder(table: OrderedTable): Promise<number> {
    this.ensureOrderedTable(table);

    const { data, error } = await this.supabaseService.client
      .from(table)
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return ((data?.display_order as number | null | undefined) ?? -1) + 1;
  }

  async reorder(
    table: OrderedTable,
    entityName: string,
    id: string,
    displayOrder: number,
  ) {
    this.ensureOrderedTable(table);

    const { error } = await this.supabaseService.client.rpc(
      'reorder_display_order',
      {
        p_table_name: table,
        p_item_id: id,
        p_new_order: displayOrder,
      },
    );

    if (error) {
      if (error.code === 'P0002') {
        throw new NotFoundException(`${entityName} "${id}" was not found.`);
      }

      throw error;
    }
  }

  async deleteById(table: OrderedTable, entityName: string, id: string) {
    this.ensureOrderedTable(table);

    const { data, error } = await this.supabaseService.client
      .from(table)
      .select('id, display_order')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`${entityName} "${id}" was not found.`);

    const { error: deleteError } = await this.supabaseService.client
      .from(table)
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    const { error: compactError } = await this.supabaseService.client.rpc(
      'compact_display_order',
      {
        p_table_name: table,
        p_deleted_order: data.display_order,
      },
    );

    if (compactError) throw compactError;

    return { id };
  }

  private ensureOrderedTable(table: OrderedTable) {
    if (!this.orderedTables.has(table)) {
      throw new BadRequestException(`Table "${table}" cannot be reordered.`);
    }
  }
}

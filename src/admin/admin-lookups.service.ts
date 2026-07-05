import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceType } from '../experiences/interfaces/experience.interface';
import { mapExperienceTypeRow } from '../experiences/experience.mapper';
import { SkillCategory } from '../skills/interfaces/skill.interface';
import { mapSkillCategoryRow } from '../skills/skill.mapper';
import { SupabaseService } from '../supabase/supabase.service';
import { AdminOrderService } from './admin-order.service';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { UpdateLookupDto } from './dto/update-lookup.dto';

@Injectable()
export class AdminLookupsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly adminOrderService: AdminOrderService,
  ) {}

  async createSkillCategory(dto: CreateLookupDto): Promise<SkillCategory> {
    const displayOrder =
      await this.adminOrderService.getNextDisplayOrder('skill_categories');

    const { data, error } = await this.supabaseService.client
      .from('skill_categories')
      .insert({
        name: dto.name,
        description: dto.description ?? null,
        display_order: displayOrder,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return mapSkillCategoryRow(data);
  }

  async updateSkillCategory(
    id: string,
    dto: UpdateLookupDto,
  ): Promise<SkillCategory> {
    const { data, error } = await this.supabaseService.client
      .from('skill_categories')
      .update({
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description }
          : {}),
      })
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new NotFoundException(`Skill category with id "${id}" was not found.`);
    }

    return mapSkillCategoryRow(data);
  }

  async deleteSkillCategory(id: string) {
    return this.adminOrderService.deleteById(
      'skill_categories',
      'Skill category',
      id,
    );
  }

  async reorderSkillCategory(
    id: string,
    displayOrder: number,
  ): Promise<SkillCategory> {
    await this.adminOrderService.reorder(
      'skill_categories',
      'Skill category',
      id,
      displayOrder,
    );

    return this.findSkillCategoryById(id);
  }

  async createExperienceType(dto: CreateLookupDto): Promise<ExperienceType> {
    const displayOrder =
      await this.adminOrderService.getNextDisplayOrder('experience_types');

    const { data, error } = await this.supabaseService.client
      .from('experience_types')
      .insert({
        name: dto.name,
        description: dto.description ?? null,
        display_order: displayOrder,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return mapExperienceTypeRow(data);
  }

  async updateExperienceType(
    id: string,
    dto: UpdateLookupDto,
  ): Promise<ExperienceType> {
    const { data, error } = await this.supabaseService.client
      .from('experience_types')
      .update({
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description }
          : {}),
      })
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new NotFoundException(`Experience type with id "${id}" was not found.`);
    }

    return mapExperienceTypeRow(data);
  }

  async deleteExperienceType(id: string) {
    return this.adminOrderService.deleteById(
      'experience_types',
      'Experience type',
      id,
    );
  }

  async reorderExperienceType(
    id: string,
    displayOrder: number,
  ): Promise<ExperienceType> {
    await this.adminOrderService.reorder(
      'experience_types',
      'Experience type',
      id,
      displayOrder,
    );

    return this.findExperienceTypeById(id);
  }

  private async findSkillCategoryById(id: string): Promise<SkillCategory> {
    const { data, error } = await this.supabaseService.client
      .from('skill_categories')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      throw new NotFoundException(`Skill category with id "${id}" was not found.`);
    }

    return mapSkillCategoryRow(data);
  }

  private async findExperienceTypeById(id: string): Promise<ExperienceType> {
    const { data, error } = await this.supabaseService.client
      .from('experience_types')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      throw new NotFoundException(`Experience type with id "${id}" was not found.`);
    }

    return mapExperienceTypeRow(data);
  }
}

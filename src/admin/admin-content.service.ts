import { Injectable, NotFoundException } from '@nestjs/common';
import { mapExperienceRow } from '../experiences/experience.mapper';
import { Experience } from '../experiences/interfaces/experience.interface';
import { Project } from '../projects/interfaces/project.interface';
import { mapProjectRow } from '../projects/project.mapper';
import { Skill } from '../skills/interfaces/skill.interface';
import { mapSkillRow } from '../skills/skill.mapper';
import { SupabaseService } from '../supabase/supabase.service';
import { Technology } from '../technologies/interfaces/technology.interface';
import { mapTechnologyRow } from '../technologies/technology.mapper';
import { AdminOrderService } from './admin-order.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Injectable()
export class AdminContentService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly adminOrderService: AdminOrderService,
  ) {}

  async createTechnology(dto: CreateTechnologyDto): Promise<Technology> {
    const displayOrder =
      await this.adminOrderService.getNextDisplayOrder('technologies');

    const { data, error } = await this.supabaseService.client
      .from('technologies')
      .insert({
        name: dto.name,
        description: dto.description ?? null,
        display_order: displayOrder,
      })
      .select('*')
      .single();

    if (error) throw error;

    return mapTechnologyRow(data);
  }

  async updateTechnology(
    id: string,
    dto: UpdateTechnologyDto,
  ): Promise<Technology> {
    const { data, error } = await this.supabaseService.client
      .from('technologies')
      .update(this.removeUndefined({
        name: dto.name,
        description: dto.description,
      }))
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Technology "${id}" was not found.`);

    return mapTechnologyRow(data);
  }

  async deleteTechnology(id: string) {
    return this.adminOrderService.deleteById('technologies', 'Technology', id);
  }

  async reorderTechnology(id: string, displayOrder: number): Promise<Technology> {
    await this.adminOrderService.reorder(
      'technologies',
      'Technology',
      id,
      displayOrder,
    );

    return this.findTechnologyById(id);
  }

  async createSkill(dto: CreateSkillDto): Promise<Skill> {
    const displayOrder = await this.adminOrderService.getNextDisplayOrder('skills');

    const { data, error } = await this.supabaseService.client
      .from('skills')
      .insert({
        name: dto.name,
        description: dto.description ?? null,
        category_id: dto.categoryId,
        proficiency_level: dto.proficiencyLevel,
        display_order: displayOrder,
      })
      .select('*, category:skill_categories(*)')
      .single();

    if (error) throw error;

    return mapSkillRow(data);
  }

  async updateSkill(id: string, dto: UpdateSkillDto): Promise<Skill> {
    const { data, error } = await this.supabaseService.client
      .from('skills')
      .update(this.removeUndefined({
        name: dto.name,
        description: dto.description,
        category_id: dto.categoryId,
        proficiency_level: dto.proficiencyLevel,
      }))
      .eq('id', id)
      .select('*, category:skill_categories(*)')
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Skill "${id}" was not found.`);

    return mapSkillRow(data);
  }

  async deleteSkill(id: string) {
    return this.adminOrderService.deleteById('skills', 'Skill', id);
  }

  async reorderSkill(id: string, displayOrder: number): Promise<Skill> {
    await this.adminOrderService.reorder('skills', 'Skill', id, displayOrder);

    return this.findSkillById(id);
  }

  async createExperience(dto: CreateExperienceDto): Promise<Experience> {
    const displayOrder =
      await this.adminOrderService.getNextDisplayOrder('experiences');

    const { data, error } = await this.supabaseService.client
      .from('experiences')
      .insert({
        title: dto.title,
        organization: dto.organization ?? null,
        description: dto.description,
        type_id: dto.typeId,
        start_date: dto.startDate,
        end_date: dto.endDate ?? null,
        is_current: dto.isCurrent ?? false,
        location: dto.location ?? null,
        attachment_id: dto.attachmentId ?? null,
        display_order: displayOrder,
      })
      .select(
        `
          *,
          type:experience_types(*),
          attachment:media_files!experiences_attachment_id_fkey(*)
        `,
      )
      .single();

    if (error) throw error;

    return mapExperienceRow(data);
  }

  async updateExperience(
    id: string,
    dto: UpdateExperienceDto,
  ): Promise<Experience> {
    const { data, error } = await this.supabaseService.client
      .from('experiences')
      .update(this.removeUndefined({
        title: dto.title,
        organization: dto.organization,
        description: dto.description,
        type_id: dto.typeId,
        start_date: dto.startDate,
        end_date: dto.endDate,
        is_current: dto.isCurrent,
        location: dto.location,
        attachment_id: dto.attachmentId,
      }))
      .eq('id', id)
      .select(
        `
          *,
          type:experience_types(*),
          attachment:media_files!experiences_attachment_id_fkey(*)
        `,
      )
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Experience "${id}" was not found.`);

    return mapExperienceRow(data);
  }

  async deleteExperience(id: string) {
    return this.adminOrderService.deleteById('experiences', 'Experience', id);
  }

  async reorderExperience(id: string, displayOrder: number): Promise<Experience> {
    await this.adminOrderService.reorder(
      'experiences',
      'Experience',
      id,
      displayOrder,
    );

    return this.findExperienceById(id);
  }

  async createProject(dto: CreateProjectDto): Promise<Project> {
    const displayOrder =
      await this.adminOrderService.getNextDisplayOrder('projects');

    const { data, error } = await this.supabaseService.client
      .from('projects')
      .insert({
        title: dto.title,
        slug: dto.slug,
        summary: dto.summary,
        description: dto.description ?? null,
        github_url: dto.githubUrl ?? null,
        live_url: dto.liveUrl ?? null,
        image_id: dto.imageId ?? null,
        status: dto.status ?? 'draft',
        display_order: displayOrder,
      })
      .select('id')
      .single();

    if (error) throw error;

    if (dto.technologyIds) {
      await this.replaceProjectTechnologies(data.id, dto.technologyIds);
    }

    return this.findProjectById(data.id);
  }

  async updateProject(id: string, dto: UpdateProjectDto): Promise<Project> {
    const { data, error } = await this.supabaseService.client
      .from('projects')
      .update(this.removeUndefined({
        title: dto.title,
        slug: dto.slug,
        summary: dto.summary,
        description: dto.description,
        github_url: dto.githubUrl,
        live_url: dto.liveUrl,
        image_id: dto.imageId,
        status: dto.status,
      }))
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Project "${id}" was not found.`);

    if (dto.technologyIds) {
      await this.replaceProjectTechnologies(id, dto.technologyIds);
    }

    return this.findProjectById(id);
  }

  async deleteProject(id: string) {
    return this.adminOrderService.deleteById('projects', 'Project', id);
  }

  async reorderProject(id: string, displayOrder: number): Promise<Project> {
    await this.adminOrderService.reorder('projects', 'Project', id, displayOrder);

    return this.findProjectById(id);
  }

  private async findTechnologyById(id: string): Promise<Technology> {
    const { data, error } = await this.supabaseService.client
      .from('technologies')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Technology "${id}" was not found.`);

    return mapTechnologyRow(data);
  }

  private async findSkillById(id: string): Promise<Skill> {
    const { data, error } = await this.supabaseService.client
      .from('skills')
      .select('*, category:skill_categories(*)')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Skill "${id}" was not found.`);

    return mapSkillRow(data);
  }

  private async findExperienceById(id: string): Promise<Experience> {
    const { data, error } = await this.supabaseService.client
      .from('experiences')
      .select(
        `
          *,
          type:experience_types(*),
          attachment:media_files!experiences_attachment_id_fkey(*)
        `,
      )
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Experience "${id}" was not found.`);

    return mapExperienceRow(data);
  }

  private async findProjectById(id: string): Promise<Project> {
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
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Project "${id}" was not found.`);

    return mapProjectRow(data);
  }

  private async replaceProjectTechnologies(
    projectId: string,
    technologyIds: string[],
  ) {
    const { error: deleteError } = await this.supabaseService.client
      .from('project_technologies')
      .delete()
      .eq('project_id', projectId);

    if (deleteError) throw deleteError;

    if (technologyIds.length === 0) return;

    const { error: insertError } = await this.supabaseService.client
      .from('project_technologies')
      .insert(
        technologyIds.map((technologyId) => ({
          project_id: projectId,
          technology_id: technologyId,
        })),
      );

    if (insertError) throw insertError;
  }

  private removeUndefined<T extends Record<string, unknown>>(value: T) {
    return Object.fromEntries(
      Object.entries(value).filter(([, item]) => item !== undefined),
    );
  }
}

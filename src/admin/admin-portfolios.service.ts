import { Injectable, NotFoundException } from '@nestjs/common';
import { Portfolio, PortfolioDetail } from '../portfolio/interfaces/portfolio.interface';
import { buildPortfolioDetail, mapPortfolioRow } from '../portfolio/portfolio.mapper';
import { SupabaseService } from '../supabase/supabase.service';
import { AdminOrderService } from './admin-order.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { SetPortfolioExperiencesDto } from './dto/set-portfolio-experiences.dto';
import { SetPortfolioProjectsDto } from './dto/set-portfolio-projects.dto';
import { SetPortfolioSkillsDto } from './dto/set-portfolio-skills.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class AdminPortfoliosService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly adminOrderService: AdminOrderService,
  ) {}

  async createPortfolio(dto: CreatePortfolioDto): Promise<Portfolio> {
    if (dto.isDefault) {
      await this.clearDefaultPortfolio();
    }

    const displayOrder =
      await this.adminOrderService.getNextDisplayOrder('portfolios');

    const { data, error } = await this.supabaseService.client
      .from('portfolios')
      .insert({
        slug: dto.slug ?? this.slugify(dto.title),
        title: dto.title,
        headline: dto.headline,
        description: dto.description ?? null,
        summary: dto.summary ?? null,
        target_role: dto.targetRole ?? null,
        status: dto.status ?? 'draft',
        is_default: dto.isDefault ?? false,
        display_order: displayOrder,
        published_at: dto.publishedAt ?? null,
      })
      .select('*')
      .single();

    if (error) throw error;

    return mapPortfolioRow(data);
  }

  async updatePortfolio(
    id: string,
    dto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    if (dto.isDefault) {
      await this.clearDefaultPortfolio(id);
    }

    const { data, error } = await this.supabaseService.client
      .from('portfolios')
      .update(
        this.removeUndefined({
          slug: dto.slug,
          title: dto.title,
          headline: dto.headline,
          description: dto.description,
          summary: dto.summary,
          target_role: dto.targetRole,
          status: dto.status,
          is_default: dto.isDefault,
          published_at: dto.publishedAt,
        }),
      )
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Portfolio "${id}" was not found.`);

    return mapPortfolioRow(data);
  }

  async deletePortfolio(id: string) {
    return this.adminOrderService.deleteById('portfolios', 'Portfolio', id);
  }

  async reorderPortfolio(id: string, displayOrder: number): Promise<Portfolio> {
    await this.adminOrderService.reorder(
      'portfolios',
      'Portfolio',
      id,
      displayOrder,
    );

    return this.ensurePortfolioExists(id).then(mapPortfolioRow);
  }

  async setPortfolioProjects(
    portfolioId: string,
    dto: SetPortfolioProjectsDto,
  ): Promise<PortfolioDetail> {
    await this.ensurePortfolioExists(portfolioId);
    await this.replacePortfolioRelation('portfolio_projects', portfolioId);

    if (dto.items.length > 0) {
      const { error } = await this.supabaseService.client
        .from('portfolio_projects')
        .insert(
          dto.items.map((item, index) => ({
            portfolio_id: portfolioId,
            project_id: item.projectId,
            display_order: item.displayOrder ?? index,
            featured: item.featured ?? false,
            custom_title: item.customTitle ?? null,
            custom_summary: item.customSummary ?? null,
          })),
        );

      if (error) throw error;
    }

    return this.findPortfolioDetailById(portfolioId);
  }

  async setPortfolioSkills(
    portfolioId: string,
    dto: SetPortfolioSkillsDto,
  ): Promise<PortfolioDetail> {
    await this.ensurePortfolioExists(portfolioId);
    await this.replacePortfolioRelation('portfolio_skills', portfolioId);

    if (dto.items.length > 0) {
      const { error } = await this.supabaseService.client
        .from('portfolio_skills')
        .insert(
          dto.items.map((item, index) => ({
            portfolio_id: portfolioId,
            skill_id: item.skillId,
            display_order: item.displayOrder ?? index,
            featured: item.featured ?? false,
            custom_description: item.customDescription ?? null,
          })),
        );

      if (error) throw error;
    }

    return this.findPortfolioDetailById(portfolioId);
  }

  async setPortfolioExperiences(
    portfolioId: string,
    dto: SetPortfolioExperiencesDto,
  ): Promise<PortfolioDetail> {
    await this.ensurePortfolioExists(portfolioId);
    await this.replacePortfolioRelation('portfolio_experiences', portfolioId);

    if (dto.items.length > 0) {
      const { error } = await this.supabaseService.client
        .from('portfolio_experiences')
        .insert(
          dto.items.map((item, index) => ({
            portfolio_id: portfolioId,
            experience_id: item.experienceId,
            display_order: item.displayOrder ?? index,
            featured: item.featured ?? false,
            custom_description: item.customDescription ?? null,
          })),
        );

      if (error) throw error;
    }

    return this.findPortfolioDetailById(portfolioId);
  }

  private async findPortfolioDetailById(id: string): Promise<PortfolioDetail> {
    const portfolio = await this.ensurePortfolioExists(id);

    const [projectsResult, skillsResult, experiencesResult] =
      await Promise.all([
        this.supabaseService.client
          .from('portfolio_projects')
          .select(
            `
              *,
              project:projects(
                *,
                image:media_files!projects_image_id_fkey(*),
                project_technologies(
                  *,
                  technology:technologies(*)
                )
              )
            `,
          )
          .eq('portfolio_id', id)
          .order('display_order', { ascending: true }),
        this.supabaseService.client
          .from('portfolio_skills')
          .select(
            `
              *,
              skill:skills(
                *,
                category:skill_categories(*)
              )
            `,
          )
          .eq('portfolio_id', id)
          .order('display_order', { ascending: true }),
        this.supabaseService.client
          .from('portfolio_experiences')
          .select(
            `
              *,
              experience:experiences(
                *,
                type:experience_types(*),
                attachment:media_files!experiences_attachment_id_fkey(*)
              )
            `,
          )
          .eq('portfolio_id', id)
          .order('display_order', { ascending: true }),
      ]);

    if (projectsResult.error) throw projectsResult.error;
    if (skillsResult.error) throw skillsResult.error;
    if (experiencesResult.error) throw experiencesResult.error;

    return buildPortfolioDetail(
      portfolio,
      projectsResult.data ?? [],
      skillsResult.data ?? [],
      experiencesResult.data ?? [],
    );
  }

  private async ensurePortfolioExists(id: string) {
    const { data, error } = await this.supabaseService.client
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new NotFoundException(`Portfolio "${id}" was not found.`);

    return data;
  }

  private async replacePortfolioRelation(table: string, portfolioId: string) {
    const { error } = await this.supabaseService.client
      .from(table)
      .delete()
      .eq('portfolio_id', portfolioId);

    if (error) throw error;
  }

  private async clearDefaultPortfolio(exceptId?: string) {
    let query = this.supabaseService.client
      .from('portfolios')
      .update({ is_default: false })
      .eq('is_default', true);

    if (exceptId) {
      query = query.neq('id', exceptId);
    }

    const { error } = await query;

    if (error) throw error;
  }

  private slugify(value: string): string {
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return slug || 'portfolio';
  }

  private removeUndefined<T extends Record<string, unknown>>(value: T) {
    return Object.fromEntries(
      Object.entries(value).filter(([, item]) => item !== undefined),
    );
  }
}

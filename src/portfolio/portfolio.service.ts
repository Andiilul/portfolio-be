import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { PortfolioDetail } from './interfaces/portfolio.interface';
import { buildPortfolioDetail } from './portfolio.mapper';

@Injectable()
export class PortfolioService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findBySlug(slug: string): Promise<PortfolioDetail> {
    const { data: portfolio, error: portfolioError } =
      await this.supabaseService.client
        .from('portfolios')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

    if (portfolioError) {
      throw portfolioError;
    }

    if (!portfolio) {
      throw new NotFoundException(
        `Portfolio with slug "${slug}" was not found.`,
      );
    }

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
          .eq('portfolio_id', portfolio.id)
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
          .eq('portfolio_id', portfolio.id)
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
          .eq('portfolio_id', portfolio.id)
          .order('display_order', { ascending: true }),
      ]);

    if (projectsResult.error) {
      throw projectsResult.error;
    }

    if (skillsResult.error) {
      throw skillsResult.error;
    }

    if (experiencesResult.error) {
      throw experiencesResult.error;
    }

    return buildPortfolioDetail(
      portfolio,
      projectsResult.data ?? [],
      skillsResult.data ?? [],
      experiencesResult.data ?? [],
    );
  }
}

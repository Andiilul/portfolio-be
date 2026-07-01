import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { PortfolioService } from './portfolio.service';

@ApiTags('Portfolios')
@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':slug')
  @ApiOperation({ summary: 'Get a published targeted portfolio page by slug' })
  @ApiParam({ name: 'slug', example: 'frontend-dev' })
  @ApiResponse({ status: 200, description: 'Portfolio retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Portfolio was not found.' })
  async findBySlug(@Param('slug') slug: string) {
    const portfolio = await this.portfolioService.findBySlug(slug);

    return createApiResponse('Portfolio retrieved successfully.', portfolio);
  }
}

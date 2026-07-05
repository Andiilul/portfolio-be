import { Body, Controller, Delete, Param, Patch, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuth } from '../auth/decorators/admin-auth.decorator';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { AdminPortfoliosService } from './admin-portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { SetPortfolioExperiencesDto } from './dto/set-portfolio-experiences.dto';
import { SetPortfolioProjectsDto } from './dto/set-portfolio-projects.dto';
import { SetPortfolioSkillsDto } from './dto/set-portfolio-skills.dto';
import { ReorderItemDto } from './dto/reorder-item.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@ApiTags('Admin Portfolios')
@Controller('admin/portfolios')
@AdminAuth()
export class AdminPortfoliosController {
  constructor(private readonly adminPortfoliosService: AdminPortfoliosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a portfolio page' })
  @ApiCreatedResponse({ description: 'Portfolio created successfully.' })
  async createPortfolio(@Body() dto: CreatePortfolioDto) {
    const portfolio = await this.adminPortfoliosService.createPortfolio(dto);

    return createApiResponse('Portfolio created successfully.', portfolio);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a portfolio page' })
  @ApiOkResponse({ description: 'Portfolio updated successfully.' })
  @ApiNotFoundResponse({ description: 'Portfolio was not found.' })
  async updatePortfolio(
    @Param('id') id: string,
    @Body() dto: UpdatePortfolioDto,
  ) {
    const portfolio = await this.adminPortfoliosService.updatePortfolio(id, dto);

    return createApiResponse('Portfolio updated successfully.', portfolio);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a portfolio page' })
  @ApiOkResponse({ description: 'Portfolio deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Portfolio was not found.' })
  async deletePortfolio(@Param('id') id: string) {
    const result = await this.adminPortfoliosService.deletePortfolio(id);

    return createApiResponse('Portfolio deleted successfully.', result);
  }

  @Patch(':id/reorder')
  @ApiOperation({ summary: 'Reorder a portfolio page' })
  @ApiOkResponse({ description: 'Portfolio reordered successfully.' })
  @ApiNotFoundResponse({ description: 'Portfolio was not found.' })
  async reorderPortfolio(
    @Param('id') id: string,
    @Body() dto: ReorderItemDto,
  ) {
    const portfolio = await this.adminPortfoliosService.reorderPortfolio(
      id,
      dto.displayOrder,
    );

    return createApiResponse('Portfolio reordered successfully.', portfolio);
  }

  @Put(':id/projects')
  @ApiOperation({ summary: 'Replace selected projects for a portfolio page' })
  @ApiOkResponse({ description: 'Portfolio projects updated successfully.' })
  @ApiNotFoundResponse({ description: 'Portfolio was not found.' })
  async setPortfolioProjects(
    @Param('id') id: string,
    @Body() dto: SetPortfolioProjectsDto,
  ) {
    const portfolio = await this.adminPortfoliosService.setPortfolioProjects(
      id,
      dto,
    );

    return createApiResponse(
      'Portfolio projects updated successfully.',
      portfolio,
    );
  }

  @Put(':id/skills')
  @ApiOperation({ summary: 'Replace selected skills for a portfolio page' })
  @ApiOkResponse({ description: 'Portfolio skills updated successfully.' })
  @ApiNotFoundResponse({ description: 'Portfolio was not found.' })
  async setPortfolioSkills(
    @Param('id') id: string,
    @Body() dto: SetPortfolioSkillsDto,
  ) {
    const portfolio = await this.adminPortfoliosService.setPortfolioSkills(
      id,
      dto,
    );

    return createApiResponse(
      'Portfolio skills updated successfully.',
      portfolio,
    );
  }

  @Put(':id/experiences')
  @ApiOperation({ summary: 'Replace selected experiences for a portfolio page' })
  @ApiOkResponse({ description: 'Portfolio experiences updated successfully.' })
  @ApiNotFoundResponse({ description: 'Portfolio was not found.' })
  async setPortfolioExperiences(
    @Param('id') id: string,
    @Body() dto: SetPortfolioExperiencesDto,
  ) {
    const portfolio = await this.adminPortfoliosService.setPortfolioExperiences(
      id,
      dto,
    );

    return createApiResponse(
      'Portfolio experiences updated successfully.',
      portfolio,
    );
  }
}

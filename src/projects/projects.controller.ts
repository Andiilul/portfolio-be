import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'List published projects' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully.' })
  async findAll() {
    const projects = await this.projectsService.findAll();

    return createApiResponse('Projects retrieved successfully.', projects);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a published project by slug' })
  @ApiParam({ name: 'slug', example: 'targeted-portfolio-cms' })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Project was not found.' })
  async findBySlug(@Param('slug') slug: string) {
    const project = await this.projectsService.findBySlug(slug);

    return createApiResponse('Project retrieved successfully.', project);
  }
}

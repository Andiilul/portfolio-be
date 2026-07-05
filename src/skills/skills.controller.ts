import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { SkillsService } from './skills.service';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({ summary: 'List skills with categories' })
  @ApiResponse({ status: 200, description: 'Skills retrieved successfully.' })
  async findAll(@Query() query: PaginationQueryDto) {
    const skills = await this.skillsService.findAll(query);

    return createApiResponse('Skills retrieved successfully.', skills);
  }

  @Get('categories')
  @ApiOperation({ summary: 'List skill categories' })
  @ApiResponse({
    status: 200,
    description: 'Skill categories retrieved successfully.',
  })
  async findCategories() {
    const categories = await this.skillsService.findCategories();

    return createApiResponse(
      'Skill categories retrieved successfully.',
      categories,
    );
  }
}

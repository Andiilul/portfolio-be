import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { ExperiencesService } from './experiences.service';

@ApiTags('Experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  @ApiOperation({ summary: 'List experiences with their type' })
  @ApiResponse({
    status: 200,
    description: 'Experiences retrieved successfully.',
  })
  async findAll(@Query() query: PaginationQueryDto) {
    const experiences = await this.experiencesService.findAll(query);

    return createApiResponse('Experiences retrieved successfully.', experiences);
  }

  @Get('types')
  @ApiOperation({ summary: 'List experience types' })
  @ApiResponse({
    status: 200,
    description: 'Experience types retrieved successfully.',
  })
  async findTypes() {
    const types = await this.experiencesService.findTypes();

    return createApiResponse('Experience types retrieved successfully.', types);
  }
}

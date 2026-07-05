import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { TechnologiesService } from './technologies.service';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get()
  @ApiOperation({ summary: 'List technologies used in projects' })
  @ApiResponse({
    status: 200,
    description: 'Technologies retrieved successfully.',
  })
  async findAll(@Query() query: PaginationQueryDto) {
    const technologies = await this.technologiesService.findAll(query);

    return createApiResponse(
      'Technologies retrieved successfully.',
      technologies,
    );
  }
}

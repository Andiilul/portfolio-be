import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  async findAll() {
    const technologies = await this.technologiesService.findAll();

    return createApiResponse(
      'Technologies retrieved successfully.',
      technologies,
    );
  }
}

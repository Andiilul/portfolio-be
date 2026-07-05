import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { AdminAuth } from '../auth/decorators/admin-auth.decorator';
import { AdminLookupsService } from './admin-lookups.service';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { ReorderItemDto } from './dto/reorder-item.dto';
import { UpdateLookupDto } from './dto/update-lookup.dto';

@ApiTags('Admin Lookups')
@Controller('admin')
@AdminAuth()
export class AdminLookupsController {
  constructor(private readonly adminLookupsService: AdminLookupsService) {}

  @Post('skill-categories')
  @ApiOperation({ summary: 'Create a skill category' })
  @ApiCreatedResponse({ description: 'Skill category created successfully.' })
  async createSkillCategory(@Body() dto: CreateLookupDto) {
    const category = await this.adminLookupsService.createSkillCategory(dto);

    return createApiResponse('Skill category created successfully.', category);
  }

  @Patch('skill-categories/:id')
  @ApiOperation({ summary: 'Update a skill category' })
  @ApiOkResponse({ description: 'Skill category updated successfully.' })
  @ApiNotFoundResponse({ description: 'Skill category was not found.' })
  async updateSkillCategory(
    @Param('id') id: string,
    @Body() dto: UpdateLookupDto,
  ) {
    const category = await this.adminLookupsService.updateSkillCategory(id, dto);

    return createApiResponse('Skill category updated successfully.', category);
  }

  @Delete('skill-categories/:id')
  @ApiOperation({ summary: 'Delete a skill category' })
  @ApiOkResponse({ description: 'Skill category deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Skill category was not found.' })
  async deleteSkillCategory(@Param('id') id: string) {
    const result = await this.adminLookupsService.deleteSkillCategory(id);

    return createApiResponse('Skill category deleted successfully.', result);
  }

  @Patch('skill-categories/:id/reorder')
  @ApiOperation({ summary: 'Reorder a skill category' })
  @ApiOkResponse({ description: 'Skill category reordered successfully.' })
  @ApiNotFoundResponse({ description: 'Skill category was not found.' })
  async reorderSkillCategory(
    @Param('id') id: string,
    @Body() dto: ReorderItemDto,
  ) {
    const category = await this.adminLookupsService.reorderSkillCategory(
      id,
      dto.displayOrder,
    );

    return createApiResponse('Skill category reordered successfully.', category);
  }

  @Post('experience-types')
  @ApiOperation({ summary: 'Create an experience type' })
  @ApiCreatedResponse({ description: 'Experience type created successfully.' })
  async createExperienceType(@Body() dto: CreateLookupDto) {
    const type = await this.adminLookupsService.createExperienceType(dto);

    return createApiResponse('Experience type created successfully.', type);
  }

  @Patch('experience-types/:id')
  @ApiOperation({ summary: 'Update an experience type' })
  @ApiOkResponse({ description: 'Experience type updated successfully.' })
  @ApiNotFoundResponse({ description: 'Experience type was not found.' })
  async updateExperienceType(
    @Param('id') id: string,
    @Body() dto: UpdateLookupDto,
  ) {
    const type = await this.adminLookupsService.updateExperienceType(id, dto);

    return createApiResponse('Experience type updated successfully.', type);
  }

  @Delete('experience-types/:id')
  @ApiOperation({ summary: 'Delete an experience type' })
  @ApiOkResponse({ description: 'Experience type deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Experience type was not found.' })
  async deleteExperienceType(@Param('id') id: string) {
    const result = await this.adminLookupsService.deleteExperienceType(id);

    return createApiResponse('Experience type deleted successfully.', result);
  }

  @Patch('experience-types/:id/reorder')
  @ApiOperation({ summary: 'Reorder an experience type' })
  @ApiOkResponse({ description: 'Experience type reordered successfully.' })
  @ApiNotFoundResponse({ description: 'Experience type was not found.' })
  async reorderExperienceType(
    @Param('id') id: string,
    @Body() dto: ReorderItemDto,
  ) {
    const type = await this.adminLookupsService.reorderExperienceType(
      id,
      dto.displayOrder,
    );

    return createApiResponse('Experience type reordered successfully.', type);
  }
}

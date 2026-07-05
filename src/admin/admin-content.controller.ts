import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuth } from '../auth/decorators/admin-auth.decorator';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { AdminContentService } from './admin-content.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { ReorderItemDto } from './dto/reorder-item.dto';

@ApiTags('Admin Content')
@Controller('admin')
@AdminAuth()
export class AdminContentController {
  constructor(private readonly adminContentService: AdminContentService) {}

  @Post('technologies')
  @ApiOperation({ summary: 'Create a technology' })
  @ApiCreatedResponse({ description: 'Technology created successfully.' })
  async createTechnology(@Body() dto: CreateTechnologyDto) {
    const technology = await this.adminContentService.createTechnology(dto);

    return createApiResponse('Technology created successfully.', technology);
  }

  @Patch('technologies/:id')
  @ApiOperation({ summary: 'Update a technology' })
  @ApiOkResponse({ description: 'Technology updated successfully.' })
  @ApiNotFoundResponse({ description: 'Technology was not found.' })
  async updateTechnology(
    @Param('id') id: string,
    @Body() dto: UpdateTechnologyDto,
  ) {
    const technology = await this.adminContentService.updateTechnology(id, dto);

    return createApiResponse('Technology updated successfully.', technology);
  }

  @Delete('technologies/:id')
  @ApiOperation({ summary: 'Delete a technology' })
  @ApiOkResponse({ description: 'Technology deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Technology was not found.' })
  async deleteTechnology(@Param('id') id: string) {
    const result = await this.adminContentService.deleteTechnology(id);

    return createApiResponse('Technology deleted successfully.', result);
  }

  @Patch('technologies/:id/reorder')
  @ApiOperation({ summary: 'Reorder a technology' })
  @ApiOkResponse({ description: 'Technology reordered successfully.' })
  @ApiNotFoundResponse({ description: 'Technology was not found.' })
  async reorderTechnology(
    @Param('id') id: string,
    @Body() dto: ReorderItemDto,
  ) {
    const technology = await this.adminContentService.reorderTechnology(
      id,
      dto.displayOrder,
    );

    return createApiResponse('Technology reordered successfully.', technology);
  }

  @Post('skills')
  @ApiOperation({ summary: 'Create a skill' })
  @ApiCreatedResponse({ description: 'Skill created successfully.' })
  async createSkill(@Body() dto: CreateSkillDto) {
    const skill = await this.adminContentService.createSkill(dto);

    return createApiResponse('Skill created successfully.', skill);
  }

  @Patch('skills/:id')
  @ApiOperation({ summary: 'Update a skill' })
  @ApiOkResponse({ description: 'Skill updated successfully.' })
  @ApiNotFoundResponse({ description: 'Skill was not found.' })
  async updateSkill(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    const skill = await this.adminContentService.updateSkill(id, dto);

    return createApiResponse('Skill updated successfully.', skill);
  }

  @Delete('skills/:id')
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiOkResponse({ description: 'Skill deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Skill was not found.' })
  async deleteSkill(@Param('id') id: string) {
    const result = await this.adminContentService.deleteSkill(id);

    return createApiResponse('Skill deleted successfully.', result);
  }

  @Patch('skills/:id/reorder')
  @ApiOperation({ summary: 'Reorder a skill' })
  @ApiOkResponse({ description: 'Skill reordered successfully.' })
  @ApiNotFoundResponse({ description: 'Skill was not found.' })
  async reorderSkill(@Param('id') id: string, @Body() dto: ReorderItemDto) {
    const skill = await this.adminContentService.reorderSkill(
      id,
      dto.displayOrder,
    );

    return createApiResponse('Skill reordered successfully.', skill);
  }

  @Post('experiences')
  @ApiOperation({ summary: 'Create an experience' })
  @ApiCreatedResponse({ description: 'Experience created successfully.' })
  async createExperience(@Body() dto: CreateExperienceDto) {
    const experience = await this.adminContentService.createExperience(dto);

    return createApiResponse('Experience created successfully.', experience);
  }

  @Patch('experiences/:id')
  @ApiOperation({ summary: 'Update an experience' })
  @ApiOkResponse({ description: 'Experience updated successfully.' })
  @ApiNotFoundResponse({ description: 'Experience was not found.' })
  async updateExperience(
    @Param('id') id: string,
    @Body() dto: UpdateExperienceDto,
  ) {
    const experience = await this.adminContentService.updateExperience(id, dto);

    return createApiResponse('Experience updated successfully.', experience);
  }

  @Delete('experiences/:id')
  @ApiOperation({ summary: 'Delete an experience' })
  @ApiOkResponse({ description: 'Experience deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Experience was not found.' })
  async deleteExperience(@Param('id') id: string) {
    const result = await this.adminContentService.deleteExperience(id);

    return createApiResponse('Experience deleted successfully.', result);
  }

  @Patch('experiences/:id/reorder')
  @ApiOperation({ summary: 'Reorder an experience' })
  @ApiOkResponse({ description: 'Experience reordered successfully.' })
  @ApiNotFoundResponse({ description: 'Experience was not found.' })
  async reorderExperience(
    @Param('id') id: string,
    @Body() dto: ReorderItemDto,
  ) {
    const experience = await this.adminContentService.reorderExperience(
      id,
      dto.displayOrder,
    );

    return createApiResponse('Experience reordered successfully.', experience);
  }

  @Post('projects')
  @ApiOperation({ summary: 'Create a project' })
  @ApiCreatedResponse({ description: 'Project created successfully.' })
  async createProject(@Body() dto: CreateProjectDto) {
    const project = await this.adminContentService.createProject(dto);

    return createApiResponse('Project created successfully.', project);
  }

  @Patch('projects/:id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiOkResponse({ description: 'Project updated successfully.' })
  @ApiNotFoundResponse({ description: 'Project was not found.' })
  async updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    const project = await this.adminContentService.updateProject(id, dto);

    return createApiResponse('Project updated successfully.', project);
  }

  @Delete('projects/:id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiOkResponse({ description: 'Project deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Project was not found.' })
  async deleteProject(@Param('id') id: string) {
    const result = await this.adminContentService.deleteProject(id);

    return createApiResponse('Project deleted successfully.', result);
  }

  @Patch('projects/:id/reorder')
  @ApiOperation({ summary: 'Reorder a project' })
  @ApiOkResponse({ description: 'Project reordered successfully.' })
  @ApiNotFoundResponse({ description: 'Project was not found.' })
  async reorderProject(@Param('id') id: string, @Body() dto: ReorderItemDto) {
    const project = await this.adminContentService.reorderProject(
      id,
      dto.displayOrder,
    );

    return createApiResponse('Project reordered successfully.', project);
  }
}

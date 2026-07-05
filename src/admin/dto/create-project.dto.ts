import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import type { ProjectStatus } from '../../common/types/database.types';

const projectStatuses: ProjectStatus[] = ['draft', 'published', 'archived'];

export class CreateProjectDto {
  @ApiProperty({ example: 'Targeted Portfolio CMS' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title: string;

  @ApiProperty({ example: 'targeted-portfolio-cms' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  slug: string;

  @ApiProperty({ example: 'CMS personal untuk portfolio page yang targeted.' })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiPropertyOptional({ example: 'Deskripsi lengkap project.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'https://github.com/username/repo' })
  @IsString()
  @IsOptional()
  githubUrl?: string;

  @ApiPropertyOptional({ example: 'https://portfolio.example.com' })
  @IsString()
  @IsOptional()
  liveUrl?: string;

  @ApiPropertyOptional({ example: '00000000-0000-4000-8000-000000000003' })
  @IsUUID()
  @IsOptional()
  imageId?: string;

  @ApiPropertyOptional({ example: 'published', enum: projectStatuses })
  @IsIn(projectStatuses)
  @IsOptional()
  status?: ProjectStatus;

  @ApiPropertyOptional({
    example: ['00000000-0000-4000-8000-000000000020'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  technologyIds?: string[];
}

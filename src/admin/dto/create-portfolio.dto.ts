import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import type { PortfolioStatus } from '../../common/types/database.types';

const portfolioStatuses: PortfolioStatus[] = ['draft', 'published', 'archived'];

export class CreatePortfolioDto {
  @ApiProperty({ example: 'Frontend Developer Portfolio' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title: string;

  @ApiPropertyOptional({
    example: 'frontend-dev',
    description: 'If omitted, it will be generated from title.',
  })
  @IsString()
  @IsOptional()
  @MaxLength(180)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @ApiProperty({ example: 'Frontend developer focused on clean interfaces.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  headline: string;

  @ApiPropertyOptional({ example: 'Portfolio page untuk role frontend.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Ringkasan portfolio yang targeted.' })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiPropertyOptional({ example: 'Frontend Developer' })
  @IsString()
  @IsOptional()
  @MaxLength(140)
  targetRole?: string;

  @ApiPropertyOptional({ example: 'draft', enum: portfolioStatuses })
  @IsIn(portfolioStatuses)
  @IsOptional()
  status?: PortfolioStatus;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @ApiPropertyOptional({ example: '2026-07-01T00:00:00.000Z' })
  @IsISO8601()
  @IsOptional()
  publishedAt?: string;
}

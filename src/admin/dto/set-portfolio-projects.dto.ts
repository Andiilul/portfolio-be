import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class PortfolioProjectInputDto {
  @ApiProperty({ example: '00000000-0000-4000-8000-000000000030' })
  @IsUUID()
  projectId: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ example: 'Portfolio CMS UI' })
  @IsString()
  @IsOptional()
  @MaxLength(160)
  customTitle?: string;

  @ApiPropertyOptional({ example: 'Narasi project untuk portfolio ini.' })
  @IsString()
  @IsOptional()
  customSummary?: string;
}

export class SetPortfolioProjectsDto {
  @ApiProperty({ type: [PortfolioProjectInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioProjectInputDto)
  items: PortfolioProjectInputDto[];
}

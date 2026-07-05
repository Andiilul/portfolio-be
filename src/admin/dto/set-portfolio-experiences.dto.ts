import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class PortfolioExperienceInputDto {
  @ApiProperty({ example: '00000000-0000-4000-8000-000000000070' })
  @IsUUID()
  experienceId: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ example: 'Narasi pengalaman untuk portfolio ini.' })
  @IsString()
  @IsOptional()
  customDescription?: string;
}

export class SetPortfolioExperiencesDto {
  @ApiProperty({ type: [PortfolioExperienceInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioExperienceInputDto)
  items: PortfolioExperienceInputDto[];
}

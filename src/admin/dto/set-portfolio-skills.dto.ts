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

export class PortfolioSkillInputDto {
  @ApiProperty({ example: '00000000-0000-4000-8000-000000000050' })
  @IsUUID()
  skillId: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ example: 'Fokus pada API modular.' })
  @IsString()
  @IsOptional()
  customDescription?: string;
}

export class SetPortfolioSkillsDto {
  @ApiProperty({ type: [PortfolioSkillInputDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioSkillInputDto)
  items: PortfolioSkillInputDto[];
}

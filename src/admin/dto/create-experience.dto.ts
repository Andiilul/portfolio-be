import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ example: 'Full-stack Developer' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title: string;

  @ApiPropertyOptional({ example: 'Personal Portfolio Project' })
  @IsString()
  @IsOptional()
  @MaxLength(160)
  organization?: string;

  @ApiProperty({ example: 'Membangun portfolio CMS personal.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '00000000-0000-4000-8000-000000000061' })
  @IsUUID()
  typeId: string;

  @ApiProperty({ example: '2026-07-01T00:00:00.000Z' })
  @IsISO8601()
  startDate: string;

  @ApiPropertyOptional({ example: '2026-12-31T00:00:00.000Z' })
  @IsISO8601()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;

  @ApiPropertyOptional({ example: 'Remote' })
  @IsString()
  @IsOptional()
  @MaxLength(140)
  location?: string;

  @ApiPropertyOptional({ example: '00000000-0000-4000-8000-000000000001' })
  @IsUUID()
  @IsOptional()
  attachmentId?: string;
}

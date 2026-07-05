import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'Backend API Design' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional({ example: 'Merancang endpoint dan service API.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '00000000-0000-4000-8000-000000000041' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: 4, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  proficiencyLevel: number;
}

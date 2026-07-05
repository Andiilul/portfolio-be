import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateContactMessageDto {
  @ApiProperty({ example: 'Andi' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({ example: 'andi@example.com' })
  @IsEmail()
  @MaxLength(180)
  email: string;

  @ApiProperty({ example: 'Project collaboration' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  subject: string;

  @ApiProperty({ example: 'Halo, saya ingin diskusi project website.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(3000)
  message: string;

  @ApiPropertyOptional({ example: 'frontend-dev' })
  @IsString()
  @IsOptional()
  @MaxLength(180)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  portfolioSlug?: string;
}

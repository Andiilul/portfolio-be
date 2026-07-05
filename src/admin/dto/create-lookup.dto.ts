import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLookupDto {
  @ApiProperty({ example: 'Frontend' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    example: 'Kemampuan membangun user interface dan pengalaman pengguna.',
  })
  @IsString()
  @IsOptional()
  description?: string;
}

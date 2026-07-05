import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import type { ContactMessageStatus } from '../../common/types/database.types';

const contactMessageStatuses: ContactMessageStatus[] = [
  'new',
  'read',
  'replied',
  'archived',
];

export class UpdateContactMessageStatusDto {
  @ApiProperty({ example: 'read', enum: contactMessageStatuses })
  @IsIn(contactMessageStatuses)
  status: ContactMessageStatus;
}

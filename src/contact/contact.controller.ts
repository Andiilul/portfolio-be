import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Send a public contact message' })
  @ApiCreatedResponse({ description: 'Contact message sent successfully.' })
  async create(@Body() dto: CreateContactMessageDto) {
    const message = await this.contactService.create(dto);

    return createApiResponse('Contact message sent successfully.', message);
  }
}

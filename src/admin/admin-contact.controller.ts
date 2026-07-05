import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuth } from '../auth/decorators/admin-auth.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { AdminContactService } from './admin-contact.service';
import { UpdateContactMessageStatusDto } from './dto/update-contact-message-status.dto';

@ApiTags('Admin Contact')
@Controller('admin/contact-messages')
@AdminAuth()
export class AdminContactController {
  constructor(private readonly adminContactService: AdminContactService) {}

  @Get()
  @ApiOperation({ summary: 'List contact messages' })
  @ApiOkResponse({ description: 'Contact messages retrieved successfully.' })
  async findAll(@Query() query: PaginationQueryDto) {
    const messages = await this.adminContactService.findAll(query);

    return createApiResponse('Contact messages retrieved successfully.', messages);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update contact message status' })
  @ApiOkResponse({ description: 'Contact message status updated successfully.' })
  @ApiNotFoundResponse({ description: 'Contact message was not found.' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateContactMessageStatusDto,
  ) {
    const message = await this.adminContactService.updateStatus(id, dto);

    return createApiResponse(
      'Contact message status updated successfully.',
      message,
    );
  }
}

import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AdminApiKeyGuard } from '../guards/admin-api-key.guard';

export const AdminAuth = () =>
  applyDecorators(
    UseGuards(AdminApiKeyGuard),
    ApiBearerAuth('admin-api-key'),
    ApiHeader({
      name: 'x-admin-api-key',
      required: false,
      description: 'Alternative to Authorization: Bearer <ADMIN_API_KEY>.',
    }),
    ApiUnauthorizedResponse({ description: 'Invalid or missing admin API key.' }),
  );

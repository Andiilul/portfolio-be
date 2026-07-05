import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuth } from '../auth/decorators/admin-auth.decorator';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  @Get('health')
  @AdminAuth()
  @ApiOperation({ summary: 'Check protected admin access' })
  @ApiResponse({ status: 200, description: 'Admin access is valid.' })
  getAdminHealth() {
    return {
      status: 'ok',
      scope: 'admin',
      timestamp: new Date().toISOString(),
    };
  }
}

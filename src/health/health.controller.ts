import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check API server health' })
  @ApiResponse({ status: 200, description: 'API server is running.' })
  getHealth() {
    return this.healthService.getApiHealth();
  }

  @Get('supabase')
  @ApiOperation({ summary: 'Check Supabase connection' })
  @ApiResponse({
    status: 200,
    description: 'Returns Supabase connection status and latency.',
  })
  async getSupabaseHealth() {
    return this.healthService.getSupabaseHealth();
  }
}

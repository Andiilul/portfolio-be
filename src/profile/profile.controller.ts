import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createApiResponse } from '../common/helpers/api-response.helper';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get the default public profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Profile has not been created yet.' })
  async findDefault() {
    const profile = await this.profileService.findDefault();

    return createApiResponse('Profile retrieved successfully.', profile);
  }
}

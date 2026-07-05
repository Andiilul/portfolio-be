import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { AdminContactController } from './admin-contact.controller';
import { AdminContactService } from './admin-contact.service';
import { AdminContentController } from './admin-content.controller';
import { AdminContentService } from './admin-content.service';
import { AdminLookupsController } from './admin-lookups.controller';
import { AdminLookupsService } from './admin-lookups.service';
import { AdminOrderService } from './admin-order.service';
import { AdminPortfoliosController } from './admin-portfolios.controller';
import { AdminPortfoliosService } from './admin-portfolios.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule, SupabaseModule],
  controllers: [
    AdminController,
    AdminLookupsController,
    AdminContentController,
    AdminPortfoliosController,
    AdminContactController,
  ],
  providers: [
    AdminLookupsService,
    AdminContentService,
    AdminPortfoliosService,
    AdminContactService,
    AdminOrderService,
  ],
})
export class AdminModule {}

import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';

@Module({
  imports: [SupabaseModule],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { HealthModule } from './health/health.module';
import { MediaFilesModule } from './media-files/media-files.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { SupabaseModule } from './supabase/supabase.module';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    SupabaseModule,
    ContactModule,
    HealthModule,
    ProfileModule,
    ProjectsModule,
    PortfolioModule,
    SkillsModule,
    ExperiencesModule,
    TechnologiesModule,
    MediaFilesModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

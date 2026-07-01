import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperiencesModule } from './experiences/experiences.module';
import { HealthModule } from './health/health.module';
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
    SupabaseModule,
    HealthModule,
    ProfileModule,
    ProjectsModule,
    PortfolioModule,
    SkillsModule,
    ExperiencesModule,
    TechnologiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

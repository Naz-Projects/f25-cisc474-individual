import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CourseModule } from './course/course.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { EnrollmentService } from './enrollment/enrollment.service';
import { EnrollmentController } from './enrollment/enrollment.controller';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { SubmissionService } from './submission/submission.service';
import { SubmissionController } from './submission/submission.controller';
import { SubmissionModule } from './submission/submission.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [LinksModule, UsersModule, CourseModule, AssignmentModule, AnnouncementModule, EnrollmentModule, ProfileModule, SubmissionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

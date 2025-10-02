import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from '../prisma.service';
import { AssignmentService } from 'src/assignment/assignment.service';

@Module({
    providers: [CourseService, PrismaService],
    controllers: [CourseController]
  })
export class CourseModule {}

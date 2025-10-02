import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaService } from '../prisma.service';

//Module are the department managers
@Module({
  providers: [ProfileService, PrismaService], //These are workers/services in the USER department
  controllers: [ProfileController] //These are the people who talk to customers(handles HTTP requests)
})
export class ProfileModule {}

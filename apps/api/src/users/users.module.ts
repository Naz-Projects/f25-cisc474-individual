import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';

//Module are the department managers
@Module({
  providers: [UsersService, PrismaService], //These are workers/services in the USER department
  controllers: [UsersController] //These are the people who talk to customers(handles HTTP requests)
})
export class UsersModule {}

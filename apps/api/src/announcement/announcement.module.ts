import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { PrismaService } from '../prisma.service';
import { AnnouncementController } from './announcement.controller';

@Module({
    controllers: [AnnouncementController],
    providers: [AnnouncementService, PrismaService]
})
export class AnnouncementModule {}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Announcement } from '@repo/database';

@Injectable()
export class AnnouncementService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Announcement[]> {
        return this.prisma.announcement.findMany();
    }


    async findOne(id: string): Promise<Announcement> {
        return this.prisma.announcement.findUnique({
            where: { id },  
        });
    }
}

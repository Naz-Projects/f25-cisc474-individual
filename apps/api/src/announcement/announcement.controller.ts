import { Controller, Get, Param } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { Assignment } from '@repo/database';
@Controller('Announcements')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) {}

    @Get()
    async findAll() {
        return this.announcementService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.announcementService.findOne(id);
    }

}
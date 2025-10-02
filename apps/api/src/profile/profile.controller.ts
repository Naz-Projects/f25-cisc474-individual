import { Controller, Get, Param } from '@nestjs/common';
import { Profile } from '@repo/database';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    async findAll() {
        return this.profileService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.profileService.findOne(id);
    }

}



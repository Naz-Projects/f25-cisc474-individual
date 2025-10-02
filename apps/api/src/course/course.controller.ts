import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from '@repo/database';
@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get()
    async findAll() {
        return this.courseService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

}

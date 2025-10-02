import { Controller, Get, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
@Controller('enrollments')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) {}

    @Get()
    async findAll() {
        return this.enrollmentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.enrollmentService.findOne(id);
    }

}



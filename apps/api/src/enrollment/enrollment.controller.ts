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

    /**
     * Get all courses a user is enrolled in
     * Endpoint: GET /enrollments/user/:userId/courses
     * Example: GET /enrollments/user/user_nazmul_001/courses
     */
    @Get('user/:userId/courses')
    async getUserCourses(@Param('userId') userId: string) {
        return this.enrollmentService.findUserCourses(userId);
    }

}



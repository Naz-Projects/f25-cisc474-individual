import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from '@repo/database';
@Controller('assignments')
export class AssignmentController {
    constructor(private readonly assignmentsService: AssignmentService) {}

    @Get()
    async findAll() {
        return this.assignmentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.assignmentsService.findOne(id);
    }

}

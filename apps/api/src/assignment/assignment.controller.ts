import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from '@repo/database';
import { AssignmentOut, AssignmentCreateIn, AssignmentUpdateIn } from  '@repo/api/assignments/dto/assignments.dto';
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

    @Post()
    async create(@Body() createAssignmentDto: AssignmentCreateIn):
    Promise<AssignmentOut> {
        return this.assignmentsService.create(createAssignmentDto);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAssignmentDto: AssignmentUpdateIn
    ): Promise<AssignmentOut> {
        return this.assignmentsService.update(id, updateAssignmentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.assignmentsService.remove(id);
    }

}

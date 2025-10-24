import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from '@repo/database';
import { AssignmentOut, AssignmentCreateIn, AssignmentUpdateIn } from  '@repo/api/assignments/dto/assignments.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/jwt.strategy';
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
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() createAssignmentDto: AssignmentCreateIn, @CurrentUser() user: JwtUser):
    Promise<AssignmentOut> {
        console.log('User creating assignment:', user);
        return this.assignmentsService.create(createAssignmentDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAssignmentDto: AssignmentUpdateIn
    ): Promise<AssignmentOut> {
        return this.assignmentsService.update(id, updateAssignmentDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.assignmentsService.remove(id);
    }

}

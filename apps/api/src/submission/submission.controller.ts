import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionService } from './submission.service';
@Controller('submissions')
export class SubmissionController {
    constructor(private readonly submissionService: SubmissionService) {}

    @Get()
    async findAll() {
        return this.submissionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.submissionService.findOne(id);
    }

}



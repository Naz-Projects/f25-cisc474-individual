import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Submission } from '@repo/database';

@Injectable()
export class SubmissionService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Submission[]> {
        return this.prisma.submission.findMany();
    }


    async findOne(id: string): Promise<Submission | null> {
        return this.prisma.submission.findUnique({
            where: { id },  
        });
    }
}

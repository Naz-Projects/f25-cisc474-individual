import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Assignment } from '@repo/database';

@Injectable()
export class AssignmentService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Assignment[]> {
        return this.prisma.assignment.findMany();
    }


    async findOne(id: string): Promise<Assignment> {
        return this.prisma.assignment.findUnique({
            where: { id },  
        });
    }
}

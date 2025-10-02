import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Enrollment } from '@repo/database';

@Injectable()
export class EnrollmentService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Enrollment[]> {
        return this.prisma.enrollment.findMany();
    }


    async findOne(id: string): Promise<Enrollment> {
        return this.prisma.enrollment.findUnique({
            where: { id },  
        });
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Course } from '@repo/database';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Course[]> {
        return this.prisma.course.findMany();
    }


    async findOne(id: string): Promise<Course> {
        return this.prisma.course.findUnique({
            where: { id },  
        });
    }
}

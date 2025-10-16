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

    //returns Array of courses with enrollments, assignments, and announcements
    async findInstructorCourses(instructorId: string) {
        return this.prisma.course.findMany({
            where: {
                instructorID: instructorId
            },
            include: {
                instructor: true,
                assignments: {
                    orderBy: { dueDate: 'asc' }
                },
                announcements: {
                    orderBy: { createdAt: 'desc' },
                    take: 3
                },
                _count: {
                    select: {
                        enrollments: true,
                        assignments: true
                    }
                }
            }
        });
    }
}

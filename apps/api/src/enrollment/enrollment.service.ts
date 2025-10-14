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

    /**
     * Get all courses a user is enrolled in with related data
     * @param userId - The user ID to fetch enrollments for
     * @returns Array of enrollments with course, instructor, assignments, and announcements
     */
    async findUserCourses(userId: string) {
        return this.prisma.enrollment.findMany({
            where: {
                userId: userId,
                status: 'ACTIVE'  // Only active enrollments
            },
            include: {
                course: {
                    include: {
                        instructor: true,      // Get instructor name
                        assignments: {         // Get assignments for the course
                            orderBy: { dueDate: 'asc' }
                        },
                        announcements: {       // Get latest announcements
                            orderBy: { createdAt: 'desc' },
                            take: 3  // Latest 3 announcements
                        },
                        _count: {             // Count enrollments
                            select: { enrollments: true }
                        }
                    }
                }
            }
        });
    }
}

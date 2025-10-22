import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Assignment } from '@repo/database';
import { AssignmentOut, AssignmentCreateIn, AssignmentUpdateIn } from '@repo/api/assignments/dto/assignments.dto';
    
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

    // Create assignment with course relation -- DTO
    async create(createAssignmentDto: AssignmentCreateIn):
    Promise<AssignmentOut> {
        const assignment = await this.prisma.assignment.create({
            data: {
                title: createAssignmentDto.title,
                description: createAssignmentDto.description,
                dueDate: new Date(createAssignmentDto.dueDate),
                maxPoints: createAssignmentDto.maxPoints,
                courseId: createAssignmentDto.courseId,
            },
            include: {
                course: true, // Include course data for display
            },
        });

        // Transform to DTO
        return {
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate.toISOString(),
            maxPoints: assignment.maxPoints,
            courseId: assignment.courseId,
            courseName: assignment.course.title,
            courseCode: assignment.course.courseCode,
            createdAt: assignment.createdAt.toISOString(),
            updatedAt: assignment.updatedAt.toISOString(),
        };
    }

    async update(id: string, updateAssignmentDto: AssignmentUpdateIn):
    Promise<AssignmentOut> {
        const assignment = await this.prisma.assignment.update({
            where: { id },
            data: {
                ...(updateAssignmentDto.title && { title:
    updateAssignmentDto.title }),
                ...(updateAssignmentDto.description !== undefined && {
    description: updateAssignmentDto.description }),
                ...(updateAssignmentDto.dueDate && { dueDate: new
    Date(updateAssignmentDto.dueDate) }),
                ...(updateAssignmentDto.maxPoints !== undefined && {
    maxPoints: updateAssignmentDto.maxPoints }),
                ...(updateAssignmentDto.courseId && { courseId:
    updateAssignmentDto.courseId }),
            },
            include: {
                course: true,
            },
        });

        // Transform to DTO
        return {
            id: assignment.id,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate.toISOString(),
            maxPoints: assignment.maxPoints,
            courseId: assignment.courseId,
            courseName: assignment.course.title,
            courseCode: assignment.course.courseCode,
            createdAt: assignment.createdAt.toISOString(),
            updatedAt: assignment.updatedAt.toISOString(),
        };
    }

    async remove(id: string): Promise<void> {
        await this.prisma.assignment.delete({
            where: { id },
        });
    }
}



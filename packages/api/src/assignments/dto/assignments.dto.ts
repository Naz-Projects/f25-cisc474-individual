import { z } from 'zod';

// Reference DTOs (lightweight relation embeds)
export const AssignmentRef = z.object({
    id: z.string(),
    title: z.string(),
    });
export type AssignmentRef = z.infer<typeof AssignmentRef>;

// Output DTOs (API responses)
export const AssignmentOut = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    dueDate: z.string(), // ISO date string
    maxPoints: z.number().nullable(),
    courseId: z.string(),
    courseName: z.string(), // Include course name for display
    courseCode: z.string(), // Include course code for display
    createdAt: z.string(), // ISO date string
    updatedAt: z.string(), // ISO date string
});
export type AssignmentOut = z.infer<typeof AssignmentOut>;

// Creation DTOs (API request bodies)
export const AssignmentCreateIn = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional().nullable(),
    dueDate: z.string(),
    maxPoints: z.number().positive().optional().nullable(),
    courseId: z.string().min(1, 'Course ID is required'),
});
export type AssignmentCreateIn = z.infer<typeof AssignmentCreateIn>;

// Update DTOs (API request bodies)
export const AssignmentUpdateIn = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional().nullable(),
    dueDate: z.string().optional(),
    maxPoints: z.number().positive().optional().nullable(),
    courseId: z.string().optional(),
});
export type AssignmentUpdateIn = z.infer<typeof AssignmentUpdateIn>;
import * as z from 'zod'
import {TaskPriority, TaskStatus} from "@/common/enums";
import {baseResponseSchema} from "@/common/schemas/schemas.ts";

export const domainTaskSchema = z.object({
    description: z.string().nullable(),
    deadline: z.string().nullable(),
    startDate: z.string().nullable(),
    title: z.string(),
    id: z.string(),
    todoListId: z.string(),
    order: z.int(),
    addedDate: z.iso.datetime({local: true}),
    status: z.enum(TaskStatus),
    priority: z.enum(TaskPriority),
});

export const getTasksSchema = z.object({
    error: z.string().nullable(),
    totalCount: z.number().int().nonnegative(),
    items: domainTaskSchema.array(),
});

export const taskOperationResponseSchema = baseResponseSchema(
    z.object({
        item: domainTaskSchema,
    }),
);

export const todolistSchema = z.object({
    id: z.string(),
    title: z.string(),
    addedDate: z.string().datetime({ local: true }),
    order: z.number(),
});

export const createTodolistResponseSchema = baseResponseSchema(
    z.object({
        item: todolistSchema,
    }),
)

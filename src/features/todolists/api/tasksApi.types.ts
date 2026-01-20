import * as z from 'zod'
import {TaskPriority, TaskStatus} from "@/common/enums";
import {
    domainTaskSchema,
    getTasksSchema,
    taskOperationResponseSchema
} from "@/features/todolists/model/schemas/schemas.ts";

export type DomainTaskType = z.infer<typeof domainTaskSchema>

export type GetTasksResponseType = z.infer<typeof getTasksSchema>;

export type TaskOperationResponseType = z.infer<typeof taskOperationResponseSchema>

export type UpdateTaskModelType = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

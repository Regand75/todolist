import type { TaskPriority, TaskStatus } from "@/common/enums/enums"

export type DomainTaskType = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: DomainTaskType[]
}

export type UpdateTaskModelType = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

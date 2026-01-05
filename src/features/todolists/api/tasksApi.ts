import { instance } from "@/common/instance"
import {DomainTaskType, GetTasksResponseType, UpdateTaskModelType} from "@/features/todolists/api/tasksApi.types";
import {BaseResponseType} from "@/common/types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponseType<{ item: DomainTaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModelType }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponseType<{ item: DomainTaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

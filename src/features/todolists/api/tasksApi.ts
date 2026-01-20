import {instance} from "@/common/instance"
import {
    GetTasksResponseType,
    TaskOperationResponseType,
    UpdateTaskModelType
} from "@/features/todolists/api/tasksApi.types";
import {DefaultResponseType} from "@/common/types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<TaskOperationResponseType>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModelType }) {
    const { todolistId, taskId, model } = payload
    return instance.put<TaskOperationResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<DefaultResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

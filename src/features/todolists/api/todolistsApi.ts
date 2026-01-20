import {instance} from "@/common/instance"
import {CreateTodolistResponse, TodolistType} from "@/features/todolists/api/todolistsApi.types";
import {DefaultResponseType} from "@/common/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<DefaultResponseType>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<CreateTodolistResponse>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<DefaultResponseType>(`/todo-lists/${id}`)
  },
}

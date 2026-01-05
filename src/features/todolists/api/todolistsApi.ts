import { instance } from "@/common/instance"
import {TodolistType} from "@/features/todolists/api/todolistsApi.types";
import {BaseResponseType} from "@/common/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponseType>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${id}`)
  },
}

import {createTodolistResponseSchema, todolistSchema} from "@/features/todolists/model/schemas/schemas.ts";
import * as z from "zod";

export type TodolistType = z.infer<typeof todolistSchema>

export type CreateTodolistResponse = z.infer<typeof createTodolistResponseSchema>

import {RootState} from "@/app/store";
import {TodolistType} from "@/features/todolists/model/todolists-reducer.ts";

export const selectTodolists = (state: RootState): TodolistType[] =>state.todolists;
import {RootState} from "@/app/store";
import {TasksStateType} from "@/features/todolists/model/tasks-reducer.ts";

export const selectTasks = (state: RootState): TasksStateType => state.tasks;
import { createAction } from '@reduxjs/toolkit';
import { TasksStateType } from '@/features/todolists/model/tasks-slice';
import { DomainTodolistType } from '@/features/todolists/model/todolists-slice';

export type clearDataACType = {
  tasks: TasksStateType;
  todolists: DomainTodolistType[];
};

export const clearDataAC = createAction<clearDataACType>('common/clearData');

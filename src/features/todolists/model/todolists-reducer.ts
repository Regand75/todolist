import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {TodolistType} from "@/app/App";
import {FilterValues} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";

const initialState: TodolistType[] = [];

export const deleteTodolistAC = createAction<{
    id: string
}>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {id: nanoid(), title}};
});

export const changeTodolistTitleAC = createAction<{
    id: string,
    newTitle: string
}>('todolists/changeTodolistTitle');

export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>('todolists/changeTodolistFilter');

export const todolistsReducer = createReducer(initialState, builder => {
   builder
       .addCase(deleteTodolistAC, (state, action) => {
           const index = state.findIndex(todolist => todolist.id === action.payload.id);
           if (index !== -1) {
               state.splice(index, 1);
           }
       })
       .addCase(createTodolistAC, (state, action) => {
           state.unshift({id: action.payload.id, title: action.payload.title, filter: 'all'});
       })
       .addCase(changeTodolistTitleAC, (state, action) => {
           const todolist = state.find(todolist => todolist.id === action.payload.id);
           if (todolist) {
               todolist.title = action.payload.newTitle;
           }
       })
       .addCase(changeTodolistFilterAC, (state, action) => {
           const todolist = state.find(todolist => todolist.id === action.payload.id);
           if (todolist) {
               todolist.filter = action.payload.filter;
           }
       })
});


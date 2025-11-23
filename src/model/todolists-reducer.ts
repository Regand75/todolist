import {TodolistType} from "../App.tsx";
import {v1} from "uuid";
import {FilterValues} from "../components/TodolistItem/TodolistItem.tsx";

type Action = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction;

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>;

const initialState: TodolistType[] = [];

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const;
}

export const createTodolistAC = (title: string) => {
    const todolistId = v1();
    return {type: 'create_todolist', payload: {id: todolistId, title}} as const;
}

export const changeTodolistTitleAC = (payload: {id: string, newTitle: string}) => {
    const {id, newTitle} = payload;
    return {type: 'change_todolist_title', payload: {id, newTitle}} as const;
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => {
    const {id, filter} = payload;
    return {type: 'change_todolist_filter', payload: {id, filter}} as const;
}

export const todolistsReducer = (state: TodolistType[] = initialState, action: Action): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id);
        }
        case 'create_todolist': {
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist];
        }
        case 'change_todolist_title': {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                title: action.payload.newTitle
            } : todolist);
        }
        case 'change_todolist_filter': {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist);
        }
        default: {
            return state;
        }
    }
}
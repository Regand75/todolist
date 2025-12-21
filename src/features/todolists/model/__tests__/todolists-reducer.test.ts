import {beforeEach, test, expect} from 'vitest';
import {v1} from "uuid";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolists-reducer.ts";
import {TodolistType} from "@/app/App";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[] = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
});

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC({id: todolistId1}));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be created', () => {
    const title = 'New todolist';
    const endState = todolistsReducer(startState, createTodolistAC(title));
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(title);
});

test('correct todolist should change its title', () => {
    const newTitle = 'New title';
    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, newTitle}));
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTitle);
});

test('correct todolist should change its filter', () => {
    const filter = 'completed';
    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter}));
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(filter);
});



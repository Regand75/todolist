import './App.css'
import {FilterValues, TodolistItem} from "./components/TodolistItem.tsx";
import {v1} from "uuid";
import {useState} from "react";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValues;
}

type TasksStateType = {
    [key: string]: TasksType[]
}

export const App = () => {
    const todolistId1 = v1() as string;
    const todolistId2 = v1() as string;

    const [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1() as string, title: 'HTML&CSS', isDone: true },
            { id: v1() as string, title: 'JS', isDone: true },
            { id: v1() as string, title: 'ReactJS', isDone: false },
            { id: v1() as string, title: 'Rest API', isDone: true },
            { id: v1() as string, title: 'GraphQL', isDone: false },
        ],
        [todolistId2]: [
            { id: v1() as string, title: 'Rest API', isDone: true },
            { id: v1() as string, title: 'GraphQL', isDone: false },
            { id: v1() as string, title: 'JS', isDone: true },
            { id: v1() as string, title: 'ReactJS', isDone: false },
        ],
    });

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)});
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1() as string, title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)});
    }

    const deleteTodolist = (todolistId: string) => {
        setTodoLists(prev => prev.filter(todolist => todolist.id !== todolistId));
        delete tasks[todolistId];
        setTasks(({[todolistId]: _, ...rest}) => rest);
        // setTasks(prevTasks => {
        //     const newTasks = {...prevTasks};
        //     delete newTasks[todolistId];
        //     return newTasks;
        // });
    }

    return (
        <div className="app">
            {todoLists.map((todolist) => (
                <TodolistItem key={todolist.id}
                              todolist={todolist}
                              tasks={tasks[todolist.id]}
                              deleteTask={deleteTask}
                              createTask={createTask}
                              changeTaskStatus={changeTaskStatus}
                              setTodoLists={setTodoLists}
                              deleteTodolist={deleteTodolist}/>
            ))}
        </div>
    )
}


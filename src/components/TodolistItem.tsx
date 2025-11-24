import {TasksType, TodolistType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState} from "react";
import {Input} from "./Input.tsx";

type PropsType = {
    todolist: TodolistType;
    tasks: TasksType[];
    deleteTask: (todolistId: string, taskId: string) => void;
    createTask: (todolistId: string, title: string) => void;
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
    setTodoLists: Dispatch<SetStateAction<TodolistType[]>>;
    deleteTodolist: (todolistId: string) => void
}

export type FilterValues = 'all' | 'active' | 'completed';

export const TodolistItem = ({
                                 todolist: {id, title, filter},
                                 tasks,
                                 deleteTask,
                                 createTask,
                                 changeTaskStatus,
                                 setTodoLists,
                                 deleteTodolist,
                             }: PropsType) => {

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const filteredFoo = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    }

    const filteredTasks = (id: string, filterValue: FilterValues) => {
        setTodoLists((prevTodoLists) => prevTodoLists.map(todolist => todolist.id === id ? {...todolist, filter: filterValue} : todolist));

    }

    const mappedTasks = filteredFoo().map(task => {
        const deleteTaskHandler = () => {
            deleteTask(id, task.id);
        }
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = event.currentTarget.checked;
            changeTaskStatus(id, task.id, newStatusValue);
        }
        return (
            <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <Input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <span>{task.title}</span>
                <Button title='+' callBack={deleteTaskHandler}/>
            </li>
        )
    });

    const filteredTasksHandler = (value: FilterValues) => () => filteredTasks(id, value);

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim();
        if (trimmedTitle !== '') {
            createTask(id, trimmedTitle);
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
        setError(null);
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler();
        }
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id);
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title='x' callBack={deleteTodolistHandler}/>
            </div>
            <div>
                <Input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title='+' callBack={createTaskHandler}/>
                {error && <div className='error-message'>{error}</div>}
            </div>
            {tasks.length === 0 ? (<p>Tasks no</p>) : (<ul>{mappedTasks}</ul>)}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title='All'
                        callBack={filteredTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title='Active'
                        callBack={filteredTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title='Completed'
                        callBack={filteredTasksHandler('completed')}/>
            </div>
        </div>
    )
}
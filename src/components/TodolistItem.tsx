import {TasksType, TodolistType} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Input} from "./Input.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type PropsType = {
    todolist: TodolistType;
    tasks: TasksType[];
    deleteTask: (todolistId: string, taskId: string) => void;
    createTask: (todolistId: string, title: string) => void;
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
    setTodoLists: Dispatch<SetStateAction<TodolistType[]>>;
    deleteTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
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
                                 changeTaskTitle,
                                 changeTodolistTitle,
                             }: PropsType) => {

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
        setTodoLists((prevTodoLists) => prevTodoLists.map(todolist => todolist.id === id ? {
            ...todolist,
            filter: filterValue
        } : todolist));

    }

    const mappedTasks = filteredFoo().map(task => {
        const deleteTaskHandler = () => {
            deleteTask(id, task.id);
        };
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = event.currentTarget.checked;
            changeTaskStatus(id, task.id, newStatusValue);
        };
        const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(id, task.id, newTitle);
        };

        return (
            <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <Input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan onChange={changeTaskTitleHandler} title={task.title}/>
                <Button title='+' callBack={deleteTaskHandler}/>
            </li>
        )
    });

    const filteredTasksHandler = (value: FilterValues) => () => filteredTasks(id, value);

    const deleteTodolistHandler = () => {
        deleteTodolist(id);
    };

    const createTaskHandler = (EditedTitle: string) => {
        createTask(id, EditedTitle);
    };

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle);
    };

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan onChange={changeTodolistTitleHandler} title={title}/>
                </h3>
                <Button title='x' callBack={deleteTodolistHandler}/>
            </div>
            <CreateItemForm createItem={createTaskHandler}/>
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
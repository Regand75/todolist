import {TaskType, TodolistType} from "../../App.tsx";
import Button from '@mui/material/Button';
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {CreateItemForm} from "./../CreateItemForm.tsx";
import {EditableSpan} from "./../EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

type PropsType = {
    todolist: TodolistType;
    tasks: TaskType[];
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
            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    <EditableSpan onChange={changeTaskTitleHandler} title={task.title}/>
                </div>
                <IconButton onClick={deleteTaskHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </ListItem>
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
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </div>
            <CreateItemForm createItem={createTaskHandler}/>
            {tasks.length === 0 ? (<p>Tasks no</p>) : (<List>{mappedTasks}</List>)}
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color='inherit'
                        onClick={filteredTasksHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color='primary'
                        onClick={filteredTasksHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color='secondary'
                        onClick={filteredTasksHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
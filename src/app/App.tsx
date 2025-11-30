import './App.css'
import {ReactNode, useState} from "react";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer.ts";
import {CreateItemForm} from "../components/CreateItemForm.tsx";
import {FilterValues, TodolistItem} from "../components/TodolistItem/TodolistItem.tsx";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";

type ThemeMode = 'dark' | 'light';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValues;
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    const todoLists = useAppSelector(selectTodolists);
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}));
    };

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}));
    };

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}));
    };

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}));
    }

    const createTodolistHandler = (title: string) => {
        dispatch(createTodolistAC(title));
    };

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}));
    };

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, newTitle: title}));
    };

    const filteredTasks = (todolistId: string, filterValue: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: filterValue}));
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Container maxWidth="lg">
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Button color="inherit">Sign in</Button>
                        </Container>
                        <Switch color='default' onChange={changeMode}/>
                    </Toolbar>
                </AppBar>
                <Container maxWidth='lg'>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm createItem={createTodolistHandler}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoLists.map((todolist) => (
                                <Paper sx={{p: '0 20px 20px 20px'}} key={todolist.id}>
                                    <TodolistItem todolist={todolist}
                                                  tasks={tasks[todolist.id]}
                                                  deleteTask={deleteTask}
                                                  createTask={createTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  deleteTodolist={deleteTodolist}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodolistTitle={changeTodolistTitle}
                                                  filteredTasks={filteredTasks}
                                    />
                                </Paper>
                            ) as ReactNode
                        )}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}


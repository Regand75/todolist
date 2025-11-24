import './App.css'
import {FilterValues, TodolistItem} from "./components/TodolistItem/TodolistItem.tsx";
import {v1} from "uuid";
import {ReactNode, useReducer, useState} from "react";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
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
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

type ThemeMode = 'dark' | 'light'

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

type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {
    const todolistId1 = v1() as string;
    const todolistId2 = v1() as string;

    const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1() as string, title: 'HTML&CSS', isDone: true},
            {id: v1() as string, title: 'JS', isDone: true},
            {id: v1() as string, title: 'ReactJS', isDone: false},
            {id: v1() as string, title: 'Rest API', isDone: true},
            {id: v1() as string, title: 'GraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1() as string, title: 'Rest API', isDone: true},
            {id: v1() as string, title: 'GraphQL', isDone: false},
            {id: v1() as string, title: 'JS', isDone: true},
            {id: v1() as string, title: 'ReactJS', isDone: false},
        ],
    });

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
        setTasks((prevState) => ({
            ...prevState,
            [todolistId]: prevState[todolistId].filter(task => task.id !== taskId)
        }));
    };

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1() as string, title: title, isDone: false};
        setTasks((prevState) => ({...prevState, [todolistId]: [newTask, ...tasks[todolistId]]}));
    };

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks((prevState) => ({
            ...prevState,
            [todolistId]: prevState[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        }));
    };

    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId));
        delete tasks[todolistId];
        setTasks((prevState) => {
            const {[todolistId]: _, ...rest} = prevState;
            return rest;
        });
    }

    const createTodolistHandler = (newTitle: string) => {
        const action = createTodolistAC(newTitle);
        dispatchToTodolists(action);
        setTasks((prevState) => ({...prevState, [action.payload.id]: []}));
    };

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks((prevState) => ({
            ...prevState,
            [todolistId]: prevState[todolistId].map(task => task.id === taskId ? {...task, title: title} : task)
        }));
    };

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, newTitle: title}));
    };

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
                                                  dispatchToTodolists={dispatchToTodolists}
                                                  deleteTodolist={deleteTodolist}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            ) as ReactNode
                        )}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}


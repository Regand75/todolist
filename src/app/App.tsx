import './App.css'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {selectThemeMode} from "./app-selectors";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {getTheme} from "@/common/theme/theme";
import {Header} from "@/common/components/Header/Header";
import {Main} from "@/app/Main";
import {FilterValues} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";

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
    const themeMode = useAppSelector(selectThemeMode);

    const theme = getTheme(themeMode);

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Main />
            </ThemeProvider>
        </div>
    )
}


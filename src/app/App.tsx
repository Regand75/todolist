import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {selectThemeMode} from "./app-selectors";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {getTheme} from "@/common/theme/theme";
import {Header} from "@/common/components/Header/Header";
import {Main} from "@/app/Main";
import styles from './App.module.css';

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode);

    const theme = getTheme(themeMode);

    return (
        <div className={styles.app}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Main />
            </ThemeProvider>
        </div>
    )
}


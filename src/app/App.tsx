import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppSelector} from "@/common/hooks";
import {Header} from "@/common/components";
import {Main} from "@/app/Main";
import styles from './App.module.css';
import {getTheme} from "@/common/theme";
import {selectThemeMode} from "@/app/app-slice";

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


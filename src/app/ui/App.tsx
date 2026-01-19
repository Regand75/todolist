import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppSelector} from "@/common/hooks";
import {ErrorSnackbar, Header} from "@/common/components";
import styles from './App.module.css';
import {getTheme} from "@/common/theme";
import {selectThemeMode} from "@/app/model/app-slice.ts";
import {Routing} from "@/app/ui/Routing/Routing.tsx";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode);

    const theme = getTheme(themeMode);

    return (
        <div className={styles.app}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Routing/>
                <ErrorSnackbar/>
            </ThemeProvider>
        </div>
    )
}


import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { ErrorSnackbar, Header } from '@/common/components';
import styles from './App.module.css';
import { getTheme } from '@/common/theme';
import { selectThemeMode } from '@/app/model/app-slice.ts';
import { Routing } from '@/common/routing';
import { useEffect, useState } from 'react';
import { meTC } from '@/features/auth/model/auth-slice';
import { CircularProgress } from '@mui/material';

export const App = () => {
  const [isInit, setIsInit] = useState(false);
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  useEffect(() => {
    dispatch(meTC()).finally(() => {
      setIsInit(true);
    });
  }, []);

  if (!isInit) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  );
};

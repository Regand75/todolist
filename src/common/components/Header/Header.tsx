import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { changeThemeModeAC, selectStatus, selectThemeMode } from '@/app/model/app-slice.ts';
import { LinearProgress } from '@mui/material';
import { logoutTC, selectIsLoggedIn, selectUserData } from '@/features/auth/model/auth-slice';
import { NavButton } from '@/common/components/NavButton/NavButton';

export const Header = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const status = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userEmail = useAppSelector(selectUserData);

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }));
  };

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Container maxWidth="lg">
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Container>
        {isLoggedIn && <span style={{ marginRight: '20px' }}>{userEmail}</span>}
        {isLoggedIn && <NavButton onClick={logoutHandler}>Logout</NavButton>}
        <Switch color="default" onChange={changeMode} />
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  );
};

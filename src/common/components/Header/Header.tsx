import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {useAppDispatch} from "@/common/hooks";
import {changeThemeModeAC, selectThemeMode} from "@/app/app-slice";
import {useAppSelector} from "@/common/hooks";

export const Header = () => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectThemeMode);

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}));
    }

    return (
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
    );
};

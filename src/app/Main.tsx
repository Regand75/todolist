import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm";
import {createTodolistAC} from "@/features/todolists/model/todolists-reducer";
import {Todolist} from "@/features/todolists/ui/Todolists/Todolist";

export const Main = () => {
    const dispatch = useAppDispatch();

    const createTodolistHandler = (title: string) => {
        dispatch(createTodolistAC(title));
    };

    return (
        <Container maxWidth='lg'>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm createItem={createTodolistHandler}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolist />
            </Grid>
        </Container>
    );
};

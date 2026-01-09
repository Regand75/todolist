import {useAppDispatch} from "@/common/hooks";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/common/components";
import {Todolist} from "@/features/todolists/ui/Todolists/Todolist";
import {createTodolistTC} from "@/features/todolists/model/todolists-slice";

export const Main = () => {
    const dispatch = useAppDispatch();

    const createTodolistHandler = (title: string) => {
        dispatch(createTodolistTC(title));
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

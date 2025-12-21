import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";
import Paper from "@mui/material/Paper";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors";

export const Todolist = () => {
    const todoLists = useAppSelector(selectTodolists);

    return (
        <>
            {todoLists.map((todolist) => (
                    <Paper sx={{p: '0 20px 20px 20px'}} key={todolist.id}>
                        <TodolistItem todolist={todolist}/>
                    </Paper>
                )
            )}
        </>
    );
};

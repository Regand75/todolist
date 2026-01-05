import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";
import Paper from "@mui/material/Paper";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {fetchTodolistsTC, selectTodolists} from "@/features/todolists/model/todolists-slice";
import {useEffect} from "react";

export const Todolist = () => {
    const todoLists = useAppSelector(selectTodolists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [])

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

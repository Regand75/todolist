import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {TodolistType} from "@/app/App";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";

type TodolistTitleProps = {
    todolist: TodolistType;
}

export const TodolistTitle = ({todolist}: TodolistTitleProps) => {
    const {id, title} = todolist;
    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}));
    };

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, newTitle: title}));
    };

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan onChange={changeTodolistTitle} title={title}/>
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteForeverIcon/>
            </IconButton>
        </div>
    );
};

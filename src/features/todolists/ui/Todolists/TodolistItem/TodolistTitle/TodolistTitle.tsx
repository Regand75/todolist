import {EditableSpan} from "@/common/components";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch} from "@/common/hooks";
import styles from './TodolistTitle.module.css'
import {changeTodolistTitleTC, deleteTodolistTC, DomainTodolistType} from "@/features/todolists/model/todolists-slice";

type TodolistTitleProps = {
    todolist: DomainTodolistType;
}

export const TodolistTitle = ({todolist}: TodolistTitleProps) => {
    const {id, title, entityStatus} = todolist;
    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistTC(id));
    };

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC({id, title}));
    };

    const disabled = todolist.entityStatus === "loading"

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan onChange={changeTodolistTitle} title={title} disabled={disabled}/>
            </h3>
            <IconButton onClick={deleteTodolist} disabled={entityStatus === 'loading'}>
                <DeleteForeverIcon/>
            </IconButton>
        </div>
    );
};

import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/features/todolists/model/tasks-reducer";
import {TaskType} from "@/app/App";
import {ChangeEvent} from "react";
import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles";

type TaskItemProps = {
    task: TaskType;
    todolistId: string
}

export const TaskItem = ({task, todolistId}: TaskItemProps) => {
    const dispatch = useAppDispatch();

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}));
    };
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = event.currentTarget.checked;
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue}));
    };
    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title: newTitle}));
    };

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan onChange={changeTaskTitle} title={task.title}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteForeverIcon/>
            </IconButton>
        </ListItem>
    );
};

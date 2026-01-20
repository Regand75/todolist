import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch} from "@/common/hooks";
import {deleteTaskTC, updateTaskTC} from "@/features/todolists/model/tasks-slice";
import {ChangeEvent} from "react";
import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles";
import {DomainTaskType} from "@/features/todolists/api/tasksApi.types";
import {TaskStatus} from "@/common/enums";
import {DomainTodolistType} from "@/features/todolists/model/todolists-slice";

type TaskItemProps = {
    task: DomainTaskType;
    todolist: DomainTodolistType;
}

export const TaskItem = ({task, todolist}: TaskItemProps) => {
    const dispatch = useAppDispatch();

    const deleteTask = () => {
        dispatch(deleteTaskTC({todolistId: todolist.id, taskId: task.id}));
    };
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        const newStatus = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const newTask = {task, domainModel: {status: newStatus}};
        dispatch(updateTaskTC(newTask));
    };
    const changeTaskTitle = (newTitle: string) => {
        const newTask = {task, domainModel: {title: newTitle}};
        dispatch(updateTaskTC(newTask));
    };

    const checked = task.status === TaskStatus.Completed
    const disabled = todolist.entityStatus === 'loading';

    return (
        <ListItem sx={getListItemSx(checked)}>
            <div>
                <Checkbox checked={checked} onChange={changeTaskStatus} disabled={disabled}/>
                <EditableSpan onChange={changeTaskTitle} title={task.title} disabled={disabled}/>
            </div>
            <span>{new Date(task.addedDate).toLocaleDateString()}</span>
            <IconButton onClick={deleteTask} disabled={disabled}>
                <DeleteForeverIcon/>
            </IconButton>
        </ListItem>
    );
};

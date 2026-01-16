import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {List} from "@mui/material";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem";
import {DomainTodolistType} from "@/features/todolists/model/todolists-slice";
import {fetchTasksTC, selectTasks} from "@/features/todolists/model/tasks-slice";
import {useEffect} from "react";
import {TaskStatus} from "@/common/enums";

type TasksProps = {
    todolist: DomainTodolistType
}

export const Tasks = ({todolist}: TasksProps) => {
    const {id, filter} = todolist;
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(id));
    }, []);

    const todolistTasks = tasks[id] ?? [];

    const filteredFoo = () => {
        switch (filter) {
            case 'active':
                return todolistTasks.filter(task => task.status === TaskStatus.New);
            case 'completed':
                return todolistTasks.filter(task => task.status === TaskStatus.Completed);
            default:
                return todolistTasks;
        }
    }

    return (
        <>
            {todolistTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredFoo().map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                todolist={todolist}
                            />
                        )
                    )}
                </List>
            )}
        </>
    );
};

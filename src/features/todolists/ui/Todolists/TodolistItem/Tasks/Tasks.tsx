import {TodolistType} from "@/app/App";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/features/todolists/model/tasks-selectors";
import {List} from "@mui/material";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem";

type TasksProps = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: TasksProps) => {
    const {id, filter} = todolist;
    const tasks = useAppSelector(selectTasks);
    const todolistTasks = tasks[id] ?? [];

    const filteredFoo = () => {
        switch (filter) {
            case 'active':
                return todolistTasks.filter(task => !task.isDone);
            case 'completed':
                return todolistTasks.filter(task => task.isDone);
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
                                todolistId={id}
                            />
                        )
                    )}
                </List>
            )}
        </>
    );
};

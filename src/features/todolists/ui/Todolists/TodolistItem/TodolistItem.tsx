import {CreateItemForm} from "@/common/components";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks";
import {useAppDispatch} from "@/common/hooks";
import {DomainTodolistType} from "@/features/todolists/model/todolists-slice.ts";
import {createTaskTC} from "@/features/todolists/model/tasks-slice";

type PropsType = {
    todolist: DomainTodolistType;
}

export const TodolistItem = ({
                                 todolist,
                             }: PropsType) => {
    const dispatch = useAppDispatch();

    const createTask = (title: string) => {
        dispatch(createTaskTC({todolistId: todolist.id, title}));
    };

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm createItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}
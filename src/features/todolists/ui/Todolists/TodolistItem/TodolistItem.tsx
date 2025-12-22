import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer";
import {TodolistType} from "@/features/todolists/model/todolists-reducer.ts";

type PropsType = {
    todolist: TodolistType;
}

export const TodolistItem = ({
                                 todolist,
                             }: PropsType) => {
    const dispatch = useAppDispatch();

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}));
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
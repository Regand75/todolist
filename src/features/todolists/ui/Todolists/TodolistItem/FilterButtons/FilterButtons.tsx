import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {changeTodolistFilterAC, FilterValues, TodolistType} from "@/features/todolists/model/todolists-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {containerSx} from "@/common/styles/container.styles";

type FilterButtonsProps = {
    todolist: TodolistType;
}

export const FilterButtons = ({todolist}: FilterButtonsProps) => {
    const {id, filter} = todolist;
    const dispatch = useAppDispatch();

    const filteredTasksHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}));
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    color='inherit'
                    onClick={() => filteredTasksHandler('all')}>
                All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    color='primary'
                    onClick={() => filteredTasksHandler('active')}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    color='secondary'
                    onClick={() => filteredTasksHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};


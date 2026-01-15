import {TodolistType} from "@/features/todolists/api/todolistsApi.types";
import {todolistsApi} from "@/features/todolists/api/todolistsApi";
import {createAppSlice} from "@/common/utils/createAppSlice.ts";
import {setAppStatusAC} from "@/app/app-slice";
import {RequestStatusType} from "@/common/types";
import {ResultCode} from "@/common/enums";
import {handleServerAppError, handleServerNetworkError} from "@/common/utils";

export const todolistsSlice = createAppSlice({
    name: "todolists",
    initialState: [] as DomainTodolistType[],
    selectors: {
        selectTodolists: (state) => state,
    },
    reducers: (create) => ({
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
        changeTodolistEntityStatusAC: create.reducer<{
            id: string;
            entityStatus: RequestStatusType
        }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        }),
        fetchTodolistsTC: create.asyncThunk(async (_arg, {dispatch, rejectWithValue}) => {
            try {
                dispatch(setAppStatusAC({status: "loading"}));
                const res = await todolistsApi.getTodolists();
                dispatch(setAppStatusAC({status: "succeeded"}));
                return res.data
            } catch (error) {
                dispatch(setAppStatusAC({status: "failed"}));
                return rejectWithValue(error);
            }
        }, {
            fulfilled: (_state, action) => {
                return action.payload.map((tl) => {
                    return {...tl, filter: "all", entityStatus: 'idle'}
                })
            },
        }),
        changeTodolistTitleTC: create.asyncThunk(async (args: { id: string; title: string }, {
            dispatch,
            rejectWithValue
        }) => {
            try {
                dispatch(setAppStatusAC({status: "loading"}));
                await todolistsApi.changeTodolistTitle(args);
                dispatch(setAppStatusAC({status: "succeeded"}));
                return args
            } catch (error) {
                dispatch(setAppStatusAC({status: "failed"}));
                return rejectWithValue(null);
            }
        }, {
            fulfilled: (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            }
        }),
        deleteTodolistTC: create.asyncThunk(async (id: string, {dispatch, rejectWithValue}) => {
            try {
                dispatch(setAppStatusAC({status: "loading"}));
                dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'loading'}))
                await todolistsApi.deleteTodolist(id);
                dispatch(setAppStatusAC({status: "succeeded"}));
                return {id}
            } catch (error) {
                dispatch(setAppStatusAC({status: "failed"}));
                return rejectWithValue(null);
            }
        }, {
            fulfilled: (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }
        }),
        createTodolistTC: create.asyncThunk(
            async (title: string, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatusAC({status: "loading"}));
                    const res = await todolistsApi.createTodolist(title);
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({status: "succeeded"}));
                        return {todolist: res.data.data.item}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null);
                    }
                } catch (error) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null);
                }
            },
            {
                fulfilled: (state, action) => {
                    state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
                }
            }
        )
    }),
})

export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    fetchTodolistsTC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    createTodolistTC
} = todolistsSlice.actions;
export const {selectTodolists} = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolistType = TodolistType & { filter: FilterValues, entityStatus: RequestStatusType }

export type FilterValues = 'all' | 'active' | 'completed';





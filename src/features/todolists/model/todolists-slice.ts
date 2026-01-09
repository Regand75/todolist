import {TodolistType} from "@/features/todolists/api/todolistsApi.types";
import {todolistsApi} from "@/features/todolists/api/todolistsApi";
import {createAppSlice} from "@/app/createAppSlice";
import {changeStatusAC} from "@/app/app-slice";

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
        fetchTodolistsTC: create.asyncThunk(async (_arg, {dispatch, rejectWithValue}) => {
            try {
                dispatch(changeStatusAC({status: "loading"}));
                const res = await todolistsApi.getTodolists();
                dispatch(changeStatusAC({status: "succeeded"}));
                return res.data
            } catch (error) {
                dispatch(changeStatusAC({status: "failed"}));
                return rejectWithValue(error);
            }
        }, {
            fulfilled: (_state, action) => {
                return action.payload.map((tl) => {
                    return { ...tl, filter: "all" }
                })
            },
        }),
        changeTodolistTitleTC: create.asyncThunk( async (args: { id: string; title: string }, {dispatch, rejectWithValue}) => {
            try {
                dispatch(changeStatusAC({status: "loading"}));
                await todolistsApi.changeTodolistTitle(args);
                dispatch(changeStatusAC({status: "succeeded"}));
                return args
            } catch (error) {
                dispatch(changeStatusAC({status: "failed"}));
                return rejectWithValue(error);
            }
        },{
            fulfilled: (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            }
        }),
        deleteTodolistTC: create.asyncThunk(async (id: string, {dispatch, rejectWithValue}) => {
            try {
                dispatch(changeStatusAC({status: "loading"}));
                await todolistsApi.deleteTodolist(id);
                dispatch(changeStatusAC({status: "succeeded"}));
                return {id}
            } catch (error) {
                dispatch(changeStatusAC({status: "failed"}));
                return rejectWithValue(error);
            }
        },{
            fulfilled: (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }
        }),
        createTodolistTC: create.asyncThunk( async (title: string, {dispatch, rejectWithValue}) => {
            try {
                dispatch(changeStatusAC({status: "loading"}));
                const res = await todolistsApi.createTodolist(title);
                dispatch(changeStatusAC({status: "succeeded"}));
               return {todolist: res.data.data.item}
            } catch (error) {
                dispatch(changeStatusAC({status: "failed"}));
                return rejectWithValue(error);
            }
        },{
            fulfilled: (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: "all" })
            }
        })
    }),
})

export const {changeTodolistFilterAC, fetchTodolistsTC, changeTodolistTitleTC, deleteTodolistTC, createTodolistTC} = todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolistType = TodolistType & { filter: FilterValues }

export type FilterValues = 'all' | 'active' | 'completed';





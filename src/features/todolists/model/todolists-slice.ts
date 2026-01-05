import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {TodolistType} from "@/features/todolists/api/todolistsApi.types";
import {todolistsApi} from "@/features/todolists/api/todolistsApi";

export const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as DomainTodolistType[],
    selectors: {
        selectTodolists: (state) => state,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
                return action.payload.map((tl) => {
                    return { ...tl, filter: "all" }
                })
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.push(action.payload)
            })
    },
    reducers: (create) => ({
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
    }),
})

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_arg, thunkAPI) => {
    try {
        const res = await todolistsApi.getTodolists()
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (args: { id: string; title: string }, thunkAPI) => {
        try {
            await todolistsApi.changeTodolistTitle(args)
            return args
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const deleteTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistTC`,
    async (arg: { id: string}, thunkAPI) => {
        try {
            await todolistsApi.deleteTodolist(arg.id)
            return arg
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async (arg: { title: string}, thunkAPI) => {
        try {
            await todolistsApi.createTodolist(arg.title)
            return {
                id: nanoid(),
                title: arg.title,
                filter: "all",
                addedDate: "",
                order: 1,
            } as DomainTodolistType
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const {changeTodolistFilterAC} = todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolistType = TodolistType & { filter: FilterValues }

export type FilterValues = 'all' | 'active' | 'completed';





import {createSlice, nanoid} from "@reduxjs/toolkit";
import {createTodolistTC, deleteTodolistTC} from "@/features/todolists/model/todolists-slice";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    selectors: {
        selectTasks: (state) => state,
    },
    reducers: (create) => ({
        deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        }),
        createTaskAC: create.preparedReducer(
            (payload: { todolistId: string; title: string }) => {
                const newTask: TaskType = {
                    id: nanoid(),
                    title: payload.title,
                    isDone: false,
                }
                return { payload: { todolistId: payload.todolistId, task: newTask } }
            },
            (state, action) => {
                const { todolistId, task } = action.payload
                state[todolistId].unshift(task)
            },
        ),
        changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
            const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        }),
        changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
            const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        }),
    }),
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
})

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TasksStateType = Record<string, TaskType[]>



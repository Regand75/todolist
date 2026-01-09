import {createTodolistTC, deleteTodolistTC} from "@/features/todolists/model/todolists-slice";
import {createAppSlice} from "@/app/createAppSlice";
import {tasksApi} from "@/features/todolists/api/tasksApi";
import {DomainTaskType, UpdateTaskModelType} from "@/features/todolists/api/tasksApi.types";
import {changeStatusAC} from "@/app/app-slice";

export const tasksSlice = createAppSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    selectors: {
        selectTasks: (state) => state,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
    reducers: (create) => ({
        fetchTasksTC: create.asyncThunk(async (todolistId: string, {dispatch, rejectWithValue}) => {
            try {
                dispatch(changeStatusAC({status: "loading"}))
                const res = await tasksApi.getTasks(todolistId)
                dispatch(changeStatusAC({status: "succeeded"}));
                return {tasks: res.data.items, todolistId};
            } catch (error) {
                dispatch(changeStatusAC({status: "failed"}));
                return rejectWithValue(error)
            }
        }, {
            fulfilled: (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            }
        }),
        createTaskTC: create.asyncThunk(async (args: { todolistId: string, title: string }, {
            dispatch,
            rejectWithValue
        }) => {
            try {
                dispatch(changeStatusAC({status: "loading"}));
                const res = await tasksApi.createTask(args);
                dispatch(changeStatusAC({status: "succeeded"}));
                return {task: res.data.data.item};
            } catch (error) {
                dispatch(changeStatusAC({status: "failed"}));
                return rejectWithValue(error);
            }
        }, {
            fulfilled: (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            }
        }),
        deleteTaskTC: create.asyncThunk(async (args: { todolistId: string, taskId: string }, {
            dispatch,
            rejectWithValue
        }) => {
            try {
                dispatch(changeStatusAC({status: "loading"}));
                await tasksApi.deleteTask(args);
                dispatch(changeStatusAC({status: "succeeded"}));
                return args;
            } catch (error) {
                dispatch(changeStatusAC({status: "failed"}));
                return rejectWithValue(error);
            }
        }, {
            fulfilled: (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            }
        }),
        updateTaskTC: create.asyncThunk(async (args: {
            task: DomainTaskType,
            domainModel: Partial<UpdateTaskModelType>
        }, {dispatch, rejectWithValue}) => {
            try {
                dispatch(changeStatusAC({status: "loading"}));
                const {task, domainModel} = args;
                const model: UpdateTaskModelType = {
                    description: task.description,
                    title: task.title,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    ...domainModel,
                }
                const res = await tasksApi.updateTask({todolistId: task.todoListId, taskId: task.id, model});
                dispatch(changeStatusAC({status: "succeeded"}));
                return {task: res.data.data.item};
            } catch (error) {
                dispatch(changeStatusAC({status: "failed"}));
                return rejectWithValue(error);
            }
        }, {
            fulfilled: (state, action) => {
                const allTodolistTasks = state[action.payload.task.todoListId];
                const taskIndex = allTodolistTasks.findIndex((task) => task.id === action.payload.task.id)
                if (taskIndex !== -1) {
                    allTodolistTasks[taskIndex] = action.payload.task;
                }
            }
        }),
    }),

})

export const {fetchTasksTC, deleteTaskTC, createTaskTC, updateTaskTC} = tasksSlice.actions
export const {selectTasks} = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer

export type TasksStateType = Record<string, DomainTaskType[]>



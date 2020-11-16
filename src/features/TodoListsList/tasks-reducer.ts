import {createTodoListTC, getTodoLists, removeTodoListTC} from "./todolists-reducer";
import {tasksApi, TaskStatuses, TaskType, TodoTaskPriorities, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType} from "../../App/store";
import {setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from 'redux'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasksTC', async (todoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await tasksApi.getTasks(todoListID);
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks, todoListID}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTaskTC', async (param: { todoListID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await tasksApi.deleteTask(param.todoListID, param.taskID)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {taskID: param.taskID, todoListID: param.todoListID}
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todoListID: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try { const res = await tasksApi.createTask(param.todoListID, param.title)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return task
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    }
        catch(error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }, {dispatch, rejectWithValue, getState}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const state = getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.domainModel
    }
    const res = await tasksApi.updateTask(param.todolistId, param.taskId, apiModel)
        try {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return param
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        }
        catch(error) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null)
        }
    }
)


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (bilder) => {
        bilder.addCase(createTodoListTC.fulfilled, (state, action) => {
            state[action.payload.id] = []
        });
        bilder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload]
        });
        bilder.addCase(getTodoLists.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        bilder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListID] = action.payload.tasks
        });
        bilder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        bilder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });

        bilder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        });

    }
})

export const tasksReducer = slice.reducer

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
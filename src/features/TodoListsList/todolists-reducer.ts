import {todoListApi, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const getTodoLists = createAsyncThunk('todoList/getTodoLists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListApi.getTodoLists()
        dispatch(setAppStatusAC({status: "succeeded"}))
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {todoLists: res.data}
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const removeTodoListTC = createAsyncThunk('todoList/removeTodoList', async (todoListID: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({todolistID: todoListID, entityStatus: 'loading'}))
    try {
        const res = await todoListApi.deleteTodoList(todoListID)
        dispatch(setAppStatusAC({status: "succeeded"}))
        return todoListID
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const createTodoListTC = createAsyncThunk('todoList/createTodoList', async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListApi.createTodoList(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC({error: res.data.messages[0]}))
                return rejectWithValue(null)
            } else {
                dispatch(setAppErrorAC({error: "Some error occurred"}))
            }
            dispatch(setAppStatusAC({status: "failed"}))
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const changeTodoListTitleTC = createAsyncThunk('todoList/changeTodoListTitle', async (param: { title: string, todoListID: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListApi.updateTodoList(param.todoListID, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {title: param.title, todoListID: param.todoListID}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'todoList',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        ChangeTodoListFilterAC(state, action: PayloadAction<{ todolistID: string, todolistFilter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            state[index].filter = action.payload.todolistFilter
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{ todolistID: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            state[index].entityStatus = action.payload.entityStatus
        }
    },
    extraReducers: builder => {
        builder.addCase(getTodoLists.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(createTodoListTC.fulfilled, (state, action) => {
            state.unshift({...action.payload, filter: "all", entityStatus: "idle"})
        })
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const {
    ChangeTodoListFilterAC,
    changeTodoListEntityStatusAC
} = slice.actions


//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType }

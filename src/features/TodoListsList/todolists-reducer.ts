import {todoListApi, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todoLlist',
    initialState: initialState,
    reducers: {
        RemoveTodoListAC(state, action: PayloadAction<string>) {
            const index = state.findIndex(tl => tl.id === action.payload)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        AddTodoListAC(state, action: PayloadAction<TodoListType>) {
            state.unshift({...action.payload, filter: "all", entityStatus: "idle"})
        },
        ChangeTodoListTitleAC(state, action: PayloadAction<{todolistTitle: string, todolistID: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            state[index].title = action.payload.todolistTitle
        },
        ChangeTodoListFilterAC(state, action: PayloadAction<{todolistID: string, todolistFilter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            state[index].filter = action.payload.todolistFilter
        },
        setTodoListsAC(state, action: PayloadAction<{todoLists: Array<TodoListType>}>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: "idle" }))
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{todolistID: string, entityStatus: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            state[index].entityStatus = action.payload.entityStatus
        }
    }
})

export const todolistsReducer = slice.reducer
export const {
    RemoveTodoListAC,
    AddTodoListAC,
    ChangeTodoListTitleAC,
    ChangeTodoListFilterAC,
    setTodoListsAC,
    changeTodoListEntityStatusAC
} = slice.actions

//thunks
export const getTodoLists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListApi.getTodoLists()
        .then((response) => {
            dispatch(setTodoListsAC({ todoLists: response.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
    dispatch(setAppStatusAC({status: "succeeded"}))

}
export const deleteTodoListTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({todolistID: todoListID, entityStatus: 'loading'}))
    todoListApi.deleteTodoList(todoListID)
        .then((res) => {
            dispatch(RemoveTodoListAC(todoListID))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const createTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListApi.createTodoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setAppErrorAC({error: "Some error occurred"}))
                }
                dispatch(setAppStatusAC({status: "failed"}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodoListTitleTC = (title: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListApi.updateTodoList(todoListID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodoListTitleAC({todolistTitle: title, todolistID: todoListID}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}


//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType }

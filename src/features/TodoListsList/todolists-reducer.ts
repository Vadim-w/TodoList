import {todoListApi, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

let initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todoListID)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: "idle" }))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todolistID ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}


//actions
export const RemoveTodoListAC = (todoListID: string) => ({type: "REMOVE-TODOLIST", todoListID} as const)
export const AddTodoListAC = (todoList: TodoListType) => ({type: "ADD-TODOLIST", todoList} as const)
export const ChangeTodoListTitleAC = (todolistTitle: string, todolistID: string) =>
    ({id: todolistID, title: todolistTitle, type: 'CHANGE-TODOLIST-TITLE'} as const)
export const ChangeTodoListFilterAC = (todolistID: string, todolistFilter: FilterValuesType) =>
    ({id: todolistID, filter: todolistFilter, type: "CHANGE-TODOLIST-FILTER"} as const)
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)
export const changeTodoListEntityStatusAC = (todolistID: string, entityStatus: RequestStatusType) =>
    ({type: "CHANGE-TODOLIST-ENTITY-STATUS", todolistID, entityStatus} as const)


//thunks
export const getTodoLists = () => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setAppStatusAC("loading"))
    todoListApi.getTodoLists()
        .then((response) => {
            dispatch(setTodoListsAC(response.data))
            dispatch(setAppStatusAC("succeeded"))
        })
    dispatch(setAppStatusAC("succeeded"))

}
export const deleteTodoListTC = (todoListID: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodoListEntityStatusAC(todoListID,"loading"))
    todoListApi.deleteTodoList(todoListID)
        .then((res) => {
            dispatch(RemoveTodoListAC(todoListID))
            dispatch(setAppStatusAC("succeeded"))
            dispatch(changeTodoListEntityStatusAC(todoListID,"idle"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const createTodoListTC = (title: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setAppStatusAC("loading"))
    todoListApi.createTodoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC("Some error occurred"))
                }
                dispatch(setAppStatusAC("failed"))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodoListTitleTC = (title: string, todoListID: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setAppStatusAC("loading"))
    todoListApi.updateTodoList(todoListID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTodoListTitleAC(title, todoListID))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}


//types
type ActionsTypes =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | ReturnType<typeof changeTodoListEntityStatusAC>
    | SetTodoListsActionType
    | SetAppStatusActionType
    | SetAppErrorActionType

export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & { filter: FilterValuesType, entityStatus: RequestStatusType }

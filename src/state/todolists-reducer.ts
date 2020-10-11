import {todoListApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

let initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todoListID)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
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
    ( {id: todolistID, filter: todolistFilter, type: "CHANGE-TODOLIST-FILTER"} as const)
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)


//thunks
export const getTodoLists = () => (dispatch: Dispatch<ActionsTypes>) => {
    todoListApi.getTodoLists()
        .then( (response) => {
            dispatch(setTodoListsAC(response.data))
        })
}
export const deleteTodoListTC = (todoListID: string) => (dispatch: Dispatch<ActionsTypes> ) => {
    todoListApi.deleteTodoList(todoListID)
        .then( (res) => {
            dispatch(RemoveTodoListAC(todoListID))
        })
}
export const createTodoListTC = (title: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListApi.createTodoList(title)
        .then( (res) => {
            dispatch(AddTodoListAC(res.data.data.item))
        })
}
export const changeTodoListTitleTC = ( title: string, todoListID: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListApi.updateTodoList(todoListID, title)
        .then( (res) => {
            dispatch(ChangeTodoListTitleAC(title, todoListID))
        })
}


//types
type ActionsTypes =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | SetTodoListsActionType

export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & { filter: FilterValuesType}
import {todoListApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "react";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todoList: TodoListType
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodoListsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodoListType>
}



let initialState: Array<TodoListDomainType> = []

type ActionsTypes =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListsActionType

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todoListID)
        case 'ADD-TODOLIST': {
            const newTodList: TodoListDomainType = {
                ...action.todoList, filter: "all"
            }
            return [newTodList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const todoList1 = state.find(tl => tl.id === action.id)
            if (todoList1) {
                todoList1.filter = action.filter
            }
            return [...state]
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        default:
            return state
    }
}



export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", todoListID}
}

export const AddTodoListAC = (todoList: TodoListType): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", todoList}
}

export const ChangeTodoListTitleAC = (todolistTitle: string, todolistID: string): ChangeTodoListTitleActionType => {
    return {id: todolistID, title: todolistTitle, type: 'CHANGE-TODOLIST-TITLE'}
}

export const ChangeTodoListFilterAC = (todolistID: string, todolistFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {id: todolistID, filter: todolistFilter, type: "CHANGE-TODOLIST-FILTER"}
}

export const setTodoListsAC = (todoLists: Array<TodoListType>): SetTodoListsActionType => {
    return {type: 'SET-TODOLISTS', todoLists}
}


 export const getTodoLists = () => (dispatch: Dispatch<any>) => {
    todoListApi.getTodoLists()
        .then( (response) => {
            dispatch(setTodoListsAC(response.data))
        })
}

export const deleteTodoListTC = (todoListID: string) => (dispatch: Dispatch<any> ) => {
    todoListApi.deleteTodoList(todoListID)
        .then( (res) => {
            dispatch(RemoveTodoListAC(todoListID))
        })
}

export const createTodoListTC = (title: string) => (dispatch: Dispatch<any>) => {
    todoListApi.createTodoList(title)
        .then( (res) => {
            dispatch(AddTodoListAC(res.data.data.item))
        })
}

export const changeTodoListTitleTC = ( title: string, todoListID: string) => (dispatch: Dispatch<any>) => {
    todoListApi.updateTodoList(todoListID, title)
        .then( (res) => {
            dispatch(ChangeTodoListTitleAC(title, todoListID))
        })
}


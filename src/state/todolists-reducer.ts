import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsTypes = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, newTodList]
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
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: todoListID}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return  {title: title, type: "ADD-TODOLIST" }
}

export const ChangeTodoListTitle = (todolistTitle: string, todolistID: string): ChangeTodoListTitleActionType => {
    return {id:todolistID, title: todolistTitle, type: 'CHANGE-TODOLIST-TITLE'}
}

export const ChangeTodoListFilter = (todolistID: string, todolistFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {id: todolistID, filter: todolistFilter, type: "CHANGE-TODOLIST-FILTER"}
}
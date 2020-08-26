import {FilterValuesType, TodoListType} from "./../AppWithReducers";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string,
    todoListID: string
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

let initialState: Array<TodoListType> = []

type ActionsTypes = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsTypes):  Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodList: TodoListType = {
                id: action.todoListID,
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
           return  state
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", todoListID}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return  {title: title, type: "ADD-TODOLIST", todoListID: v1() }
}

export const ChangeTodoListTitleAC = (todolistTitle: string, todolistID: string): ChangeTodoListTitleActionType => {
    return {id:todolistID, title: todolistTitle, type: 'CHANGE-TODOLIST-TITLE'}
}

export const ChangeTodoListFilterAC = (todolistID: string, todolistFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {id: todolistID, filter: todolistFilter, type: "CHANGE-TODOLIST-FILTER"}
}
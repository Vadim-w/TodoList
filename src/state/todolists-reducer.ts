import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

let initialState: Array<TodoListDomainType> = []

type ActionsTypes =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodList: TodoListDomainType = {
                id: action.todoListID,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0
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
            return state
    }
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", todoListID}
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string,
    todoListID: string
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {title: title, type: "ADD-TODOLIST", todoListID: v1()}
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export const ChangeTodoListTitleAC = (todolistTitle: string, todolistID: string): ChangeTodoListTitleActionType => {
    return {id: todolistID, title: todolistTitle, type: 'CHANGE-TODOLIST-TITLE'}
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export const ChangeTodoListFilterAC = (todolistID: string, todolistFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {id: todolistID, filter: todolistFilter, type: "CHANGE-TODOLIST-FILTER"}
}
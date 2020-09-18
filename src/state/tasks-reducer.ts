import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../api/todolist-api";

let initialState: TaskStateType = {}

type ActionsTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            let newTodoList = [...state[action.todoListID].filter(task => task.id !== action.taskID)]
            return {...state, [action.todoListID]: newTodoList}
        case 'ADD_TASK':
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: 0,
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: "",
                todoListId: v1()
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case 'CHANGE_TASK_STATUS':
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) {
                        return task
                    } else {
                        return {...task, status: action.status}
                    }
                })
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.todoListID]
            return newState
        default:
            return state
    }
}

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    taskID: string,
    todoListID: string
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", taskID, todoListID}
}

export type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string,
    todoListID: string
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: "ADD_TASK", title, todoListID}
}

export type ChangeTaskActionType = {
    type: 'CHANGE_TASK_STATUS'
    status: TaskStatuses,
    todoListID: string,
    taskID: string

}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskID, status, todoListID}
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    title: string,
    todoListID: string,
    taskID: string

}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskID, title, todoListID}
}


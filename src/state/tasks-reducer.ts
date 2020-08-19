import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    taskID: string,
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string,
    todoListID: string
}

export type ChangeTaskActionType = {
    type: 'CHANGE_TASK_STATUS'
    isDone: boolean,
    todoListID: string,
    taskID: string

}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    title: string,
    todoListID: string,
    taskID: string

}

type ActionsTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskActionType | ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TaskStateType, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            let newTodoList = [...state[action.todoListID].filter(task => task.id !== action.taskID)]
            return {...state, [action.todoListID]: newTodoList}
        case 'ADD_TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case 'CHANGE_TASK_STATUS':
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
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
            return  {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.todoListID]
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", taskID, todoListID}
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: "ADD_TASK", title, todoListID}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskID, isDone, todoListID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskID, title, todoListID}
}

/*let changeTitleAndStatus = (tasks: Array<TaskStateType>, taskID: string, property: string | boolean):  Array<TaskStateType> => {
    let propertyName = typeof property === "string" ? "title" : "isDone";
     return [...tasks.map(task => {
        if (task.id !== taskID) {
            return task
        }
        else {
            return {...task, [propertyName]: property}
        }
    })]

}*/

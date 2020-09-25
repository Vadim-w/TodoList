import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolists-reducer";
import {TaskStateType} from "../AppWithRedux";
import {tasksApi, TaskStatuses, TaskType, TodoTaskPriorities, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "react";
import {AppRootStateType} from "./store";

let initialState: TaskStateType = {}

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    taskID: string,
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK',
    task: TaskType
}
export type ChangeTaskActionType = {
    type: 'CHANGE_TASK_STATUS'
    status: TaskStatuses,
    todoListID: string,
    taskID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    title: string,
    todoListID: string,
    taskID: string
}
type SetTasksActionType = {
    type: 'SET_TASKS'
    tasks: Array<TaskType>
    todoID: string
}
export const fetchTasksTC = (todoID: string) => (dispatch: Dispatch<any>) => {
    tasksApi.getTasks(todoID)
        .then((response) => {
            dispatch(setTasksAC(response.data.items, todoID))
        })
}


type ActionsTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTasksActionType

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            let newTodoList = [...state[action.todoListID].filter(task => task.id !== action.taskID)]
            return {...state, [action.todoListID]: newTodoList}
        case 'ADD_TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE_TASK_STATUS':
            debugger
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
                [action.todoList.id]: []
            }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.todoListID]
            return newState
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;

        }
        case 'SET_TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todoID] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", taskID, todoListID}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD_TASK", task}
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskID, status, todoListID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskID, title, todoListID}
}

export const setTasksAC = (tasks: Array<TaskType>, todoID: string): SetTasksActionType => {
    return {type: 'SET_TASKS', tasks, todoID}
}


export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch<any>) => {
    tasksApi.deleteTask(todolistID, taskID)
        .then((response) => {
            dispatch(removeTaskAC(taskID, todolistID))
        })
}

export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch<any>) => {
    tasksApi.createTask(todoListID, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const updateTaskStatusTC = (taskID: string, status: TaskStatuses, todoListID: string) =>
    (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {

        const task = getState().tasks[todoListID].find(t => t.id === taskID)
        if (task) {
            const model: UpdateTaskModelType = {
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                title: task.title,
                status: status
            }
            tasksApi.updateTask(todoListID, taskID, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(taskID, status, todoListID))
                })
        }
    }

export const updateTaskTitleTC = (todoListID: string, taskID: string, title: string) =>
    (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {
        debugger
        const task = getState().tasks[todoListID].find(t => t.id === taskID)
        if (task) {
            const model: UpdateTaskModelType = {
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                title: title,
            }

            tasksApi.updateTask(todoListID, taskID, model)
                .then((res) => {
                    dispatch(changeTaskTitleAC(taskID, title, todoListID))
                })
        }
    }


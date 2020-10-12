import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolists-reducer";
import {tasksApi, TaskStatuses, TaskType, TodoTaskPriorities, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "react";
import {AppRootStateType} from "../../App/store";

type TaskStateType = {
    [key: string]: Array<TaskType>
}

let initialState: TasksStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id != action.taskID)}
        case 'ADD_TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        case "ADD-TODOLIST":
            return {...state, [action.todoList.id]: []}
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.todoListID]
            return newState
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET_TASKS': {
            return {...state, [action.todoID]: action.tasks}
        }
        default:
            return state
    }
}


//actions
export const removeTaskAC = (taskID: string, todoListID: string) => ({type: "REMOVE_TASK", taskID, todoListID} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD_TASK", task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todoID: string) => ({type: 'SET_TASKS', tasks, todoID} as const)


//thunks
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch<ActionsTypes>) => {
    tasksApi.deleteTask(todolistID, taskID)
        .then((response) => {
            dispatch(removeTaskAC(taskID, todolistID))
        })
}
export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch<ActionsTypes>) => {
    tasksApi.createTask(todoListID, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const fetchTasksTC = (todoID: string) => (dispatch: Dispatch<ActionsTypes>) => {
    tasksApi.getTasks(todoID)
        .then((response) => {
            dispatch(setTasksAC(response.data.items, todoID))
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsTypes>, getState: () => AppRootStateType) => {
    debugger
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                } else {

                }
            })
            .catch(() => {

            })
    }


//types
type ActionsTypes =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
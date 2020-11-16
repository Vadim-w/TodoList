import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': "0788c074-2a2b-400e-ae91-bcf1a7100923"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})

//api
export const todoListApi = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<CommonResponseType<{item: TodoListType}>>('todo-lists', {title})
    },
    deleteTodoList(todoId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },
    updateTodoList(todoId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    }
}
export const tasksApi = {
    getTasks(todoId: string) {
        return instance.get<GetTasks>(`/todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<CommonResponseType<{item: TaskType}>>(`/todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<CommonResponseType>( `/todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType<{item: TaskType}>>( `/todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{userId: number}>>( '/auth/login', data)
    },
    logout() {
        return instance.delete<CommonResponseType>( '/auth/login')
    },
    me() {
        return instance.get<CommonResponseType<{item: MeResponseType}>>('/auth/me')
    }
}

//types
export type TodoListType= {
    id: string
    addedDate: string
    order: number
    title: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type FieldsErrorType = { field: string, error: string };
export type CommonResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldsErrorType>
    data: D
}
type GetTasks = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TodoTaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}
export type MeResponseType = {
    id: number
    email: string
    login: string
}



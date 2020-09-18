import axios from "axios";

export type TodoListType= {
    id: string
    addedDate: string
    order: number
    title: string
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

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
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

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': "1ddb00ae-87fd-4067-9570-c868a2d6ade3"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.1/'
}
)


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
        return instance.get<Array<TaskType>>(`/todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<CommonResponseType<{item: TaskType}>>(`/todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<CommonResponseType>( `/todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId: string, taskId: string, title: string) {
        return instance.put<CommonResponseType<{item: TaskType}>>( `/todo-lists/${todoId}/tasks/${taskId}`, {title})
    }
}
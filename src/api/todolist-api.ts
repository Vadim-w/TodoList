import axios from "axios";

type TodoListType= {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateResponseType = {
    resultCode: number
    messages: Array<string>,
    data: {
        item:  TodoListType
    }
}
type DeleteResponseType = {
    resultCode: number
    messages: Array<string>,
    data: {
        item: TodoListType
    }
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
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
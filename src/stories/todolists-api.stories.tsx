import React, {useEffect, useState} from 'react'
import {tasksApi, todoListApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTodoLists()
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "REDUX>>>>>>>>>>"
        todoListApi.createTodoList(title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = "fb2beaec-ea9d-4510-9ffd-7bf9878c66dc"
        todoListApi.deleteTodoList(todoId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "REDUX>>>>>>>>>>"
        let todoId = "c719ab4e-2e41-47c8-a903-f1d9791a6ac9"
        todoListApi.updateTodoList(todoId, title)
            .then( (response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = "c719ab4e-2e41-47c8-a903-f1d9791a6ac9"
        tasksApi.getTasks(todoId)
            .then( (response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = "c719ab4e-2e41-47c8-a903-f1d9791a6ac9"
        let title = "CSS>>>>>>>"
        tasksApi.createTask(todoId, title)
            .then( (response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = "c719ab4e-2e41-47c8-a903-f1d9791a6ac9"
        let taskId = "d87ae48f-3ebc-4002-b020-be4f1291978b"
        tasksApi.deleteTask(todoId, taskId)
            .then( (response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         let todoId = "c719ab4e-2e41-47c8-a903-f1d9791a6ac9"
//         let taskId = "e1a9b173-09c7-42ef-b7f1-83f43072db62"
//         const task = getState().tasks[todoId].find(t => t.id === taskId)
//         const model = {
//             title: task.title,
//             startDate: task.startDate,
//             priority: task.priority,
//             description: task.description,
//             deadline: task.deadline,
//             status: status
//         }
//         let title = "WORK>>>>>>>"
//         tasksApi.updateTask(todoId, taskId, model)
//             .then( (response:any) => {
//                 setState(response.data.data.item)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }

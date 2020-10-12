import {Provider} from "react-redux";
import React from 'react'
import {AppRootStateType} from "../../App/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/TodoListsList/tasks-reducer";
import {todolistsReducer} from "../../features/TodoListsList/todolists-reducer";
import {v1} from "uuid";




const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType  = {
    todolists: [
        {id: "todolistId1", title: "What to learn", addedDate: "", order: 0, filter: "all"},
        {id: "todolistId2", title: "What to buy", addedDate: "", order: 0, filter: "all" }
    ] ,

    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                description: "",
                status: 0, priority: 0,
                startDate: "", deadline: "",
                todoListId: "todolistId1", order: 0,
                addedDate: ""
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                description: "",
                status: 0, priority: 0,
                startDate: "", deadline: "",
                todoListId: "todolistId2", order: 0,
                addedDate: ""
            },
        ],

    }


}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}> {storyFn()}
    </Provider>)
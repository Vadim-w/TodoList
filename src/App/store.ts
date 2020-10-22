import {tasksReducer} from '../features/TodoListsList/tasks-reducer';
import {todolistsReducer} from '../features/TodoListsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auch: authReducer
})

//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
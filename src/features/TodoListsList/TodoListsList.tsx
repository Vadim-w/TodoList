import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {
    ChangeTodoListFilterAC,
    changeTodoListTitleTC,
    createTodoListTC,
    deleteTodoListTC,
    FilterValuesType,
    getTodoLists,
    TodoListDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/Todolist";
import { Redirect } from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<PropsType> = React.memo(({demo = false}) => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state => state.auch.isLoggedIn))
    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
     if (demo || !isLoggedIn) {
         return
     }
        dispatch(getTodoLists())
    }, [])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskTC(todoListID, taskId))
    }, [])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskTC(id, {status}, todoListID))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(updateTaskTC(taskID, {title: newTitle}, todoListID))
    }, [])

    const addTask = useCallback((newTaskName: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, newTaskName))
    }, [])

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC({ todolistFilter: newFilterValue, todolistID: todoListID}))
    }, [])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoListTC(todoListID))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [])

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodoListTitleTC(newTitle, todoListID))
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <TodoList
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodoListTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
})
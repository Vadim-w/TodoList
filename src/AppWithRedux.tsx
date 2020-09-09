import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC,} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function  AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>( (state) => state.todolists)

    let tasks = useSelector<AppRootStateType, TaskStateType>( (state) => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todoListID: string) =>  {
        dispatch(removeTaskAC(taskId, todoListID))
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todoListID: string) =>  {
        let action = changeTaskStatusAC(id, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((newTaskName: string, todoListID: string) =>  {
        dispatch(addTaskAC(newTaskName, todoListID))
    }, [dispatch])

    const changeFilter = useCallback ((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, newFilterValue))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) =>  {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) =>  {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) =>  {
        dispatch(ChangeTodoListTitleAC(newTitle, todoListID))
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}
                                    elevation={4}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasks[tl.id]}
                                        addTask={addTask}
                                        removeTasks={removeTask}
                                        changeFilter={changeFilter}
                                        changeStatus={changeStatus}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default  AppWithRedux;






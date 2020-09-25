import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeTodoListFilterAC,  changeTodoListTitleTC, createTodoListTC, deleteTodoListTC,
    FilterValuesType, getTodoLists, TodoListDomainType,
} from "./state/todolists-reducer";
import {
    addTaskTC,
    removeTaskTC, updateTaskStatusTC, updateTaskTitleTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function  AppWithRedux() {

    useEffect(() => {
       dispatch(getTodoLists())
    }, [])


    let todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>( (state) => state.todolists)

    let tasks = useSelector<AppRootStateType, TaskStateType>( (state) => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todoListID: string) =>  {
        dispatch(removeTaskTC(todoListID, taskId))
    }, [])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todoListID: string) =>  {
        dispatch(updateTaskStatusTC(id,  status, todoListID))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(updateTaskTitleTC(todoListID, taskID, newTitle))
    }, [])

    const addTask = useCallback((newTaskName: string, todoListID: string) =>  {
        dispatch(addTaskTC(todoListID, newTaskName))
    }, [])

    const changeFilter = useCallback ((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, newFilterValue))
    }, [])

    const removeTodoList = useCallback((todoListID: string) =>  {
        dispatch(deleteTodoListTC(todoListID))
    }, [])

    const addTodoList = useCallback((title: string) =>  {
        dispatch(createTodoListTC(title))
    }, [])

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) =>  {
        dispatch(changeTodoListTitleTC(newTitle, todoListID))
    }, [])


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






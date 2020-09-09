import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducers() {
    let todoLitID1 = v1();
    let todoLitID2 = v1();

    let [todoLists, dispatchToTodoList] = useReducer( todolistsReducer, [
        {id: todoLitID1, title: "What to learn", filter: "all"},
        {id: todoLitID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, dispatchToTasks] = useReducer( tasksReducer, {
        [todoLitID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoLitID2]: [
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GrandQl", isDone: false},
            {id: v1(), title: "SASS", isDone: true},
        ]
    });


    function removeTask(taskId: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListID))
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let action = changeTaskStatusAC(id, isDone, todoListID)
        dispatchToTasks(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = changeTaskTitleAC(taskID, newTitle, todoListID)
        dispatchToTasks(action)
    }


    function addTask(newTaskName: string, todoListID: string) {
        dispatchToTasks(addTaskAC(newTaskName, todoListID))
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatchToTodoList(ChangeTodoListFilterAC(todoListID, newFilterValue))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatchToTodoList(ChangeTodoListTitleAC(newTitle, todoListID))
    }


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

                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)

                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}
                                    elevation={4}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodoList}
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

export default AppWithReducers;






import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";

type PropsType = {
    id: string
    addTask: (newTaskName: string, todoListID: string) => void
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [])

    const onClickRemoveTodoList = useCallback(() => {
        props.removeTodolist(props.id)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [])

    let allTodoListTAsks = props.tasks;
    let tasksForTodoList = allTodoListTAsks
    if (props.filter === "active") {
        tasksForTodoList = allTodoListTAsks.filter(t => t.status === 0)
    }
    if (props.filter === "completed") {
        tasksForTodoList = allTodoListTAsks.filter(t => t.status === 2)

    }


    return (
        <div>
            <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForTodoList.map((task) => {
                    return <Task
                        task={task}
                        key={task.id}
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        todoListID={props.id}
                    />
                })}
            </ul>
            <div>
                <Button onClick={onAllClickHandler}
                        color={props.filter === "all" ? "secondary" : "primary"}
                        variant={"contained"}>
                    All
                </Button>
                <Button onClick={onActiveClickHandler}
                        color={props.filter === "active" ? "secondary" : "primary"}
                        variant={"contained"}>
                    Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        variant={"contained"}>
                    Completed
                </Button>
            </div>
        </div>
    )

})
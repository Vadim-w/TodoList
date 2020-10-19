import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType, TodoListDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";

type PropsType = {
    todolist: TodoListDomainType
    addTask: (newTaskName: string, todoListID: string) => void
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
    demo?: boolean
}

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.todolist.id)
    }, [])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.todolist.id)
    }, [])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.todolist.id)
    }, [])

    const onClickRemoveTodoList = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [])

    let allTodoListTAsks = props.tasks;
    let tasksForTodoList = allTodoListTAsks
    if (props.todolist.filter === "active") {
        tasksForTodoList = allTodoListTAsks.filter(t => t.status === 0)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodoList = allTodoListTAsks.filter(t => t.status === 2)

    }


    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList} disabled={props.todolist.entityStatus === "loading"}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            <ul>
                {tasksForTodoList.map((task) => {
                    return <Task
                        task={task}
                        key={task.id}
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        todoListID={props.todolist.id}
                    />
                })}
            </ul>
            <div>
                <Button onClick={onAllClickHandler}
                        color={props.todolist.filter === "all" ? "secondary" : "primary"}
                        variant={"contained"}>
                    All
                </Button>
                <Button onClick={onActiveClickHandler}
                        color={props.todolist.filter === "active" ? "secondary" : "primary"}
                        variant={"contained"}>
                    Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        color={props.todolist.filter === "completed" ? "secondary" : "primary"}
                        variant={"contained"}>
                    Completed
                </Button>
            </div>
        </div>
    )

})
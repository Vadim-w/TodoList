import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./AppWithReducers";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";

type PropsType = {
    id: string
    addTask: (newTaskName: string, todoListID: string) => void
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTasks: (taskId: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) =>  {

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [])

    const onActiveClickHandler = useCallback(() =>  {
        props.changeFilter("active", props.id)
    }, [])

    const onCompletedClickHandler = useCallback(() =>  {
        props.changeFilter("completed", props.id)
    }, [])

    const onClickRemoveTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [])

    const addTask = useCallback ((title: string) => {
        props.addTask(title, props.id)
    }, [])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [])

    let allTodoListTAsks = props.tasks;
    let tasksForTodoList = allTodoListTAsks
    if (props.filter === "active") {
        tasksForTodoList = allTodoListTAsks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = allTodoListTAsks.filter(t => t.isDone === true)

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
                    changeStatus={props.changeStatus}
                    removeTask={props.removeTasks}
                    todoListID={props.id}
                    />

                    // const removeTask = () => {
                    //     props.removeTasks(t.id, props.id)
                    // };
                    // const changeStatus = (e: ChangeEvent<HTMLInputElement>, id: string) => {
                    //     let newCheckBoxValue = e.currentTarget.checked;
                    //     props.changeStatus(t.id, newCheckBoxValue, id)
                    // }
                    //
                    // const changeTaskTitle = (newTitle: string) => {
                    //     props.changeTaskTitle(t.id, newTitle, props.id)
                    // }


                        // <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        //     <Checkbox
                        //         checked={t.isDone}
                        //         color={"primary"}
                        //         onChange={changeStatus}
                        //     />
                        //     <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                        //     <IconButton onClick={removeTask}> <Delete/> </IconButton>
                        // </li>

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
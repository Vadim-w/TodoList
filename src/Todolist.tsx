import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./AppWithReducers";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStateType, TodoListType} from "./AppWithRedux";

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

export function TodoList(props: PropsType) {

    // let tasks = useSelector<AppRootStateType, Array<TaskType>>( (state) => state.tasks.[props.id])
    // let dispatch = useDispatch()

    function onAllClickHandler() {
        props.changeFilter("all", props.id)
    }

    function onActiveClickHandler() {
        props.changeFilter("active", props.id)
    }

    function onCompletedClickHandler() {
        props.changeFilter("completed", props.id)
    }

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id)
    }

    function addTask(title: string) {
        props.addTask(title, props.id)
    }

    function changeTodoListTitle(newTitle: string) {
        props.changeTodoListTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => {
                        props.removeTasks(t.id, props.id)
                    };
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newCheckBoxValue = e.currentTarget.checked;
                        props.changeStatus(t.id, newCheckBoxValue, props.id)
                    }

                    let changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                checked={t.isDone}
                                color={"primary"}
                                onChange={changeStatus}
                            />
                            <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                            <IconButton onClick={removeTask}> <Delete/> </IconButton>
                        </li>
                    )
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

}
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: ( taskID: string, title: string, todoListID:string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    todoListID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    let {id, title, isDone} = props.task
    const changeStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => props.changeStatus( id, event.currentTarget.checked, props.todoListID),[])
    const removeTask = useCallback(() => props.removeTask(id, props.todoListID), [])
    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(id, title, props.todoListID), [])
    return (
        <li key={props.task.id} className={isDone ? "is-done" : ""}>
            <Checkbox
                checked={isDone}
                color={"primary"}
                onChange={changeStatus}
            />
            <EditableSpan title={title} saveNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}> <Delete/> </IconButton>
        </li>
    )
})
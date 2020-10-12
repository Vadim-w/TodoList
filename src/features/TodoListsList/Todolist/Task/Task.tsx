import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";

export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: ( taskID: string, title: string, todoListID:string) => void
    changeStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    todoListID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    let {id, title, status} = props.task
    const changeStatus = useCallback((event: ChangeEvent<HTMLInputElement>) =>
        props.changeStatus( id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todoListID),[])
    const removeTask = useCallback(() => props.removeTask(id, props.todoListID), [])
    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(id, title, props.todoListID), [])
    return (
        <li key={props.task.id} className={status ? "is-done" : ""}>
            <Checkbox
                checked={status === TaskStatuses.Completed}
                color={"primary"}
                onChange={changeStatus}
            />
            <EditableSpan title={title} saveNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}> <Delete/> </IconButton>
        </li>
    )
})
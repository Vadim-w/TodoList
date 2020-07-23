import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id:string
    addTask: (newTaskName: string, todoListID: string) => void
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTasks: (taskId: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void

}

export function Todolist(props: PropsType) {
    let [taskName, setTaskname] = useState(" ");
    let [error, setError] = useState<string | null>((null));

    let addTask = () => {

        if (taskName.trim()) {
            props.addTask(taskName.trim(), props.id);
            setTaskname("");
        }
        else {
            setError("Title is required!")
        }
    }

    function onTaskNameChanget(e: ChangeEvent<HTMLInputElement>) {
        setTaskname(e.currentTarget.value);
        setError(null)
    }

    function onAddTaskKeyPessed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter")
            addTask();
    }

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


    return (
        <div>
            <h3>{props.title} <button onClick={onClickRemoveTodoList}>X</button></h3>
            <div>
                <input
                    value={taskName}
                    onChange={onTaskNameChanget}
                    type="text"
                    onKeyPress={onAddTaskKeyPessed}
                    className={error ? "error":""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => {props.removeTasks(t.id, props.id)};
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                       let newCheckBoxValue =  e.currentTarget.checked;
                        props.changeStatus(t.id, newCheckBoxValue, props.id)}

                    return (
                        <li key={t.id} className={t.isDone ? "is-done":""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all"? "active-filter":""} onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === "active"? "active-filter":""} onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === "completed"? "active-filter":""} onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )

}
import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void

}

export const EditableSpan = React.memo((props: PropsType) =>  {
    console.log("EditableSpan called")
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)

    const activateEditMode = () =>  {
        setEditMode(true)
    }

    const deActivateEditMode = () =>  {
        setEditMode(false)
        props.saveNewTitle(title)
    }

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) =>  {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField variant={"filled"} value={title} onBlur={deActivateEditMode} autoFocus={true} onChange={changeTitle}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})
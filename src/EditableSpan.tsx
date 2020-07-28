import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void

}

export function EditableSpan(props: PropsType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)

    function activateEditMode() {
        setEditMode(true)
    }

    function deActivateEditMode() {
        setEditMode(false)
        props.saveNewTitle(title)
    }

    function changeTitle(e:ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title} onBlur={deActivateEditMode} autoFocus={true} onChange={changeTitle}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}
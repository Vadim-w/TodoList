import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {Delete, AddBox} from '@material-ui/icons';


type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {

    let [itemName, setItemName] = useState("");
    let [error, setError] = useState<string | null>(null);

    function onItemNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setItemName(e.currentTarget.value);
        setError(null)
    }

    function onAddItemKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter")
            addItem();
    }

    function addItem ()  {
        if (itemName.trim()) {
            props.addItem(itemName.trim());
            setItemName("");
        }
        else {
            setError("Title is required!")
        }
    }
    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            <IconButton  color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}
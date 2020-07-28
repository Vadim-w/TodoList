import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {

    let [itemName, setItemName] = useState(" ");
    let [error, setError] = useState<string | null>((null));

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
            <input
                type="text"
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}
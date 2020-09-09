import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: 'Task Stories',
    component: Task,
}

const removeCallback = action('Remove Button Inside Task Clicked')
const changeStatusCallback = action('Status changet inside Task')
const changeTitleCallback = action('Title changed inside Task')


export const TaskBaseExample = (props: any) => {
    return (
        <div>
        <Task task={{id: '1', isDone: true, title: 'CSS'}}
              changeTaskTitle={changeTitleCallback}
              changeStatus={changeStatusCallback}
              removeTask={removeCallback}
              todoListID={'todoList1'}
        />

    <Task task={{id: '1', isDone: false, title: 'CSS'}}
          changeTaskTitle={changeTitleCallback}
          changeStatus={changeStatusCallback}
          removeTask={removeCallback}
          todoListID={'todoList2'}
    />
        </div>
    )
}


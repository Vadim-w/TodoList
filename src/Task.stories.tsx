import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "./features/TodoListsList/Todolist/Task/Task";
import {TaskStatuses} from "./api/todolist-api";

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
        <Task task={{id: '1', status: TaskStatuses.New,
            title: 'CSS', todoListId: "",
            startDate: "", priority: 0,
            order: 0, description: "",
            deadline: "", addedDate: ""
        }}
              changeTaskTitle={changeTitleCallback}
              changeStatus={changeStatusCallback}
              removeTask={removeCallback}
              todoListID={'todoList1'}
        />

    <Task task={{id: '2', status: TaskStatuses.Completed,
        title: 'CSS',  todoListId: "",
        startDate: "", priority: 0,
        order: 0, description: "",
        deadline: "", addedDate: ""
    }}
          changeTaskTitle={changeTitleCallback}
          changeStatus={changeStatusCallback}
          removeTask={removeCallback}
          todoListID={'todoList2'}
    />
        </div>
    )
}


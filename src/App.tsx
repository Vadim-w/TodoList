import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "CSS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GrandQl", isDone: false},
    // ]);

    let todoLitID1 = v1();
    let todoLitID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoLitID1, title: "What to learn", filter: "all"},
        {id: todoLitID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TaskStateType>( {
        [todoLitID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoLitID2]: [
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GrandQl", isDone: false},
            {id: v1(), title: "SASS", isDone: true},
        ]
    });

   // let [filter, setFilter] = useState<FilterValuesType>("all")


    function removeTask(taskId: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function addTask(newTaskName: string, todoListID: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = newFilterValue;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList (todoListID: string) {
        delete tasks[todoListID]
        setTasks({...tasks})
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))

    }


    return (
        <div className="App">
            {
                todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)

                    }
                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={tasksForTodoList}
                            addTask={addTask}
                            removeTasks={removeTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;






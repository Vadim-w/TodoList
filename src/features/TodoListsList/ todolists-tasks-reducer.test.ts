import {
    createTodoListTC,
    removeTodoListTC,
    TodoListDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";

let startState: TasksStateType;

beforeEach( () => {
     startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""},
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""},
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""}
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""},
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""},
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""}
        ]
    };
})

test('property with todolistId should be deleted', () => {


    const action = removeTodoListTC.fulfilled("todolistId2", 'requetId', "todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];
    const newTodoList = {
        id: "1",
        addedDate: "",
        order: 0,
        title: "new todolist"
    }

    const action = createTodoListTC.fulfilled(newTodoList, 'requestId', newTodoList.title);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
});



import {AddTodoListAC, RemoveTodoListAC, TodoListDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../../App/App";
import {TaskStatuses} from "../../api/todolist-api";

let startState: TaskStateType;

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


    const action = RemoveTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
});



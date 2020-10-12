import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterValuesType,
    RemoveTodoListAC, TodoListDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {tasksReducer} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {TaskStateType} from "../../App/App";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType> = [];

beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();
     startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to buy", filter: "all",  order: 0, addedDate: ""}
    ]
})

test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});



test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ]

    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todolistId2 ));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState.length).toBe(2);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
    expect(endState.length).toBe(2);
});

test('new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New,  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""},
            { id: "2", title: "JS", status: TaskStatuses.Completed,  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: "" },
            { id: "3", title: "React", status: TaskStatuses.New,  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New,  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""  },
            { id: "2", title: "milk", status: TaskStatuses.Completed,  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: "" },
            { id: "3", title: "tea", status: TaskStatuses.New,  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: "" }
        ]
    };

    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});








import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TaskStateType} from "../AppWithRedux";
import {TaskStatuses} from "../api/todolist-api";

let startState: TaskStateType;

beforeEach( () => {
     startState = {
        "todolistId1": [
            { id: '1', status: TaskStatuses.New,
                title: 'CSS',  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""},
            {id: '2', status: TaskStatuses.Completed,
                title: 'JS',  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""},
            {id: '3', status: TaskStatuses.New,
                title: 'REACT',  todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""}
        ],
         "todolistId2": [
             { id: '1', status: TaskStatuses.New,
                 title: 'bread',  todoListId: "",
                 startDate: "", priority: 0,
                 order: 0, description: "",
                 deadline: "", addedDate: ""},
             {id: '2', status: TaskStatuses.Completed,
                 title: 'milk',  todoListId: "",
                 startDate: "", priority: 0,
                 order: 0, description: "",
                 deadline: "", addedDate: ""},
             {id: '3', status: TaskStatuses.New,
                 title: 'tea',  todoListId: "",
                 startDate: "", priority: 0,
                 order: 0, description: "",
                 deadline: "", addedDate: ""}
         ],
    };
})

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(0);
});


test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(0);
    expect(endState["todolistId1"][1].status).toBe(2);
});


test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", "beer", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});




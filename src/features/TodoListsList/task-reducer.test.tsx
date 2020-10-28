import {
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC
} from './tasks-reducer';
import {TaskStatuses, TodoTaskPriorities} from "../../api/todolist-api";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: '1', status: TaskStatuses.New,
                title: 'CSS', todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""
            },
            {
                id: '2', status: TaskStatuses.Completed,
                title: 'JS', todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""
            },
            {
                id: '3', status: TaskStatuses.New,
                title: 'REACT', todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""
            }
        ],
        "todolistId2": [
            {
                id: '1', status: TaskStatuses.New,
                title: 'bread', todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""
            },
            {
                id: '2', status: TaskStatuses.Completed,
                title: 'milk', todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""
            },
            {
                id: '3', status: TaskStatuses.New,
                title: 'tea', todoListId: "",
                startDate: "", priority: 0,
                order: 0, description: "",
                deadline: "", addedDate: ""
            }
        ],
    };
})

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC({taskID: "2", todoListID: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {

    let task = {
        description: "",
        title: "juce",
        status: TaskStatuses.New,
        priority: 0,
        startDate: '',
        deadline: '',
        id: "id exist",
        todoListId: "todolistId2",
        order: 0,
        addedDate: ''
    };
    const action = addTaskAC(task);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(0);
});


test('status of specified task should be changed', () => {

    const action = updateTaskAC({taskId: "2", model: {status: TaskStatuses.New}, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(0);
    expect(endState["todolistId1"][1].status).toBe(2);
});


test('title of specified task should be changed', () => {

    const action = updateTaskAC({taskId: "2", model: {title: "beer"}, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});




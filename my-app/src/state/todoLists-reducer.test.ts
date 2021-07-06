import {
    AddTodoList,
    ChangeFilterTodoList,
    ChangeTitleTodoList,
    RemoveTodoListAC,
    todoListsReducer
} from './todoLists-reducer' ;
import {v1} from 'uuid';
import {FilterValue, TodoListType} from '../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, AddTodoList(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValue = "active";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action:ActionType = {
    //     type: 'CHANGE-FILTER-TODOLIST',
    //     todoID: todolistId2,
    //     f: newFilter
    // };

    const endState = todoListsReducer(startState, ChangeFilterTodoList(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("active");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist23";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action:ActionType = {
    //     type: 'CHANGE-TITLE-TODOLIST',
    //     todoID: todolistId1,
    //     title: newTodolistTitle
    // };

    const endState = todoListsReducer(startState, ChangeTitleTodoList(todolistId1, newTodolistTitle));

    expect(endState[0].title).toBe("New Todolist23");
    expect(endState[0].title).toBe(newTodolistTitle);
});


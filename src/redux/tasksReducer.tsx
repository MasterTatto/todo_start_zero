import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodo, RemoveTodo, todolistId1, todolistId2} from "./todoListReducer";

type removeTask = {
    type: 'REMOVE_TASK',
    id: string,
    todoID: string
}
type addTask = {
    type: 'ADD_TASK',
    title: string,
    todoID: string
}
type changeTaskStatus = {
    type: 'CHANGE_TASK_STATUS',
    id: string,
    isDone: boolean,
    todoID: string
}
type changeTaskTitle = {
    type: 'CHANGE_TASK_TITLE',
    id: string,
    title: string,
    todoID: string
}

export type tasksActionType = removeTask | addTask | changeTaskStatus | changeTaskTitle | AddTodo | RemoveTodo;

const initialState:TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: tasksActionType): TasksStateType => {
    let copyState;
    switch (action.type) {
        case "REMOVE_TASK": {
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].filter(f => f.id !== action.id)
            return copyState;
        }
        case "ADD_TASK": {
            copyState = {...state}
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}

            copyState[action.todoID] = [newTask, ...copyState[action.todoID]]
            return copyState;
        }
        case "CHANGE_TASK_STATUS":
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].map((t) => t.id === action.id ? {
                ...t,
                isDone: action.isDone
            } : t)
            return copyState

        case "CHANGE_TASK_TITLE":
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].map((t) => t.id === action.id ? {
                ...t,
                title: action.title
            } : t)
            return copyState
        case "ADD_TODO": {
            copyState = {...state}
            copyState[action.todolistID] = []
            return copyState
        }
        case "REMOVE_TODO" : {
            copyState = {...state}
            delete copyState[action.idTodo]
            return copyState
        }

        default:
            return state
    }
}


export const removeTaskAC = (id: string, todoID: string): removeTask => {
    return {
        type: 'REMOVE_TASK', id, todoID
    }
}

export const addTaskAC = (title: string, todoID: string): addTask => {
    return {
        type: 'ADD_TASK', title, todoID
    }
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todoID: string): changeTaskStatus => {
    return {
        type: 'CHANGE_TASK_STATUS', id, isDone, todoID
    }
}
export const changeTaskTitleAC = (id: string, title: string, todoID: string): changeTaskTitle => {
    return {
        type: 'CHANGE_TASK_TITLE', id, title, todoID
    }
}
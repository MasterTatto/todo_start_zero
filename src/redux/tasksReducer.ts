import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, TodoListRemoveAT} from "./todoListReducer";

type RemoveTaskAT = {
    type: "REMOVE-TASK",
    todoID: string,
    id: string
}
type AddTaskAT = {
    type: 'ADD-TASK',
    todoID: string,
    title: string
}
type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS",
    id: string,
    isDone: boolean,
    todoID: string
}
type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    title: string,
    todoID: string
}

export type ActionType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | TodoListRemoveAT

export const tasksReducer = (state: TasksStateType, action: ActionType):TasksStateType => {
    let copyState: TasksStateType
    switch (action.type) {
        case "REMOVE-TASK":
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].filter((t) => t.id !== action.id)
            return copyState
        case "ADD-TASK":
            copyState = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoID] = [newTask, ...state[action.todoID]]
            return copyState
        case "CHANGE-TASK-STATUS":
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].map((t) => t.id === action.id ? {
                ...t,
                isDone: action.isDone
            } : t)
            return copyState
        case 'CHANGE-TASK-TITLE' :
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].map((t) => t.id === action.id ? {
                ...t,
                title: action.title
            } : t)
            return copyState
        case "ADD-TODO" :
            copyState = {...state}
            copyState[action.todoID] = []
            return copyState
        case "REMOVE-TODO" :
            copyState = {...state}
            delete copyState[action.todoID]
            return copyState
        default:
            return state
    }
}

export const RemoveTaskAC = (todoID: string, id: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK", todoID, id
    }
}
export const AddTaskAC = (todoID: string, title: string): AddTaskAT => {
    return {
        type: "ADD-TASK", todoID, title
    }
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todoID: string): changeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS", id, isDone, todoID
    }
}
export const changeTaskTitleAC = (id: string, title: string, todoID: string): changeTaskTitleAT => {
    return {
        type: 'CHANGE-TASK-TITLE', id, title, todoID
    }
}
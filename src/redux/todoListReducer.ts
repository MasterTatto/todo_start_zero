import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type TodoListRemoveAT = {
    type: "REMOVE-TODO",
    todoID: string
}

export type AddTodoListAT = {
    type: "ADD-TODO",
    title: string,
    todoID: string
}
type ChangeTitleTodoAT = {
    type: "CHANGE-TODO-TITLE",
    todoID: string,
    title: string
}
type ChangeFilterTodoAT = {
    type: "CHANGE-FILTER-TODO",
    todoID: string,
    filter: FilterValuesType
}

export type ActionType = TodoListRemoveAT | AddTodoListAT | ChangeTitleTodoAT | ChangeFilterTodoAT

export const TodoListReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    let copyState: Array<TodolistType>;
    switch (action.type) {

        case "REMOVE-TODO" :
            copyState = [...state]
            copyState = copyState.filter((tl) => tl.id !== action.todoID)
            return copyState

        case "ADD-TODO" :
            copyState = [...state]
            //const newTodo = {id: v1(), title: action.title, filter: 'all'}
            return [{id: action.todoID, title: action.title, filter: 'all'}, ...state]


        case "CHANGE-TODO-TITLE" :
            copyState = [...state]
            copyState = copyState.map((tl) => tl.id === action.todoID ? {...tl, title: action.title} : tl)
            return copyState

        case "CHANGE-FILTER-TODO": {
            copyState = [...state]
            copyState = copyState.map((tl) => tl.id === action.todoID ? {...tl, filter: action.filter} : tl)
            return copyState
        }


        default:
            return state
    }
}


export const TodoListRemoveAC = (todoID: string): TodoListRemoveAT => {
    return {
        type: "REMOVE-TODO",
        todoID
    }
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODO",
        title,
        todoID: v1()
    }
}
export const ChangeTodoTitleAC = (todoID: string, title: string): ChangeTitleTodoAT => {
    return {
        type: "CHANGE-TODO-TITLE",
        todoID,
        title
    }
}
export const ChangeFilterTodoAC = (todoID: string, filter: FilterValuesType): ChangeFilterTodoAT => {
    return {
        type: "CHANGE-FILTER-TODO",
        todoID,
        filter
    }
}
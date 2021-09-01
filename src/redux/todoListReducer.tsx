import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodo = {
    type: 'REMOVE_TODO',
    idTodo: string,
}
export type AddTodo = {
    type: 'ADD_TODO',
    title: string,
    todolistID: string
}
type ChangeTodoTitle = {
    type: 'CHANGE_TODO_TITLE',
    id: string,
    title: string
}
type ChangeFilterTodo = {
    type: 'CHANGE_FILTER_TODO',
    id: string,
    filter: FilterValuesType
}
export let todolistId1 = v1();
export let todolistId2 = v1();
const initialState:TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export type actionType = RemoveTodo | AddTodo | ChangeTodoTitle | ChangeFilterTodo

export const todolistsReducer = (state: TodolistType[] = initialState, action: actionType): TodolistType[] => {
    let copyState;
    switch (action.type) {
        case "REMOVE_TODO":
            copyState = {...state}
            copyState = [...state].filter(f => f.id !== action.idTodo)
            return copyState;
        case "ADD_TODO":

            const newTodo: TodolistType = {id: action.todolistID, title: action.title, filter: 'all'}
            return [...state, newTodo]
        case "CHANGE_TODO_TITLE":
            copyState = {...state}
            copyState = [...state].map((tl) => tl.id === action.id ? {...tl, title: action.title} : tl)
            return copyState
        case "CHANGE_FILTER_TODO":
            copyState = {...state}
            copyState = [...state].map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            return copyState
        default:
            return state
    }
}

export const RemoveTodoAC = (idTodo: string): RemoveTodo => {
    return {type: 'REMOVE_TODO', idTodo}
}
export const AddTodoAC = (title: string): AddTodo => {
    return {type: "ADD_TODO", title, todolistID: v1()}
}
export const ChangeTitleTodoAC = (id: string, title: string): ChangeTodoTitle => {
    return {type: 'CHANGE_TODO_TITLE', id, title}
}
export const ChangeFilterTodo = (id: string, filter: FilterValuesType): ChangeFilterTodo => {
    return {type: 'CHANGE_FILTER_TODO', id, filter}
}
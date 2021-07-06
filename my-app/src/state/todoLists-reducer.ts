import {FilterValue, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoID: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string;
}
type ChangeFilterTodoAT = {
    type: 'CHANGE-FILTER-TODOLIST'
    todoID: string
    f: FilterValue

}
type ChangeSpanTodoAT = {
    type: 'CHANGE-TITLE-TODOLIST'
    todoID: string
    title: string
}
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeFilterTodoAT | ChangeSpanTodoAT
//
//REDUCER
export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(f => f.id !== action.todoID)

        case "ADD-TODOLIST":
            const todoID = v1()
            const newTodoList: TodoListType = {
                id: todoID,
                title: action.title,
                filter: 'all'
            }
            return [newTodoList, ...todoLists]

        case "CHANGE-FILTER-TODOLIST":
            return todoLists.map(t => t.id === action.todoID ? {...t, filter: action.f} : t)

        case "CHANGE-TITLE-TODOLIST":
            return todoLists.map((tl) => {
                if (tl.id === action.todoID) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        default:
            return todoLists
    }

}
//ACTION CREATER
export const RemoveTodoListAC = (todoID: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoID
    }
}
//
export const AddTodoList = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title
    }
}
//
export const ChangeFilterTodoList = (todoID: string, f: FilterValue): ChangeFilterTodoAT => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        todoID,
        f

    }
}
//
export const ChangeTitleTodoList = (todoID: string, title: string): ChangeSpanTodoAT => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        todoID,
        title
    }
}
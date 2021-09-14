import {v1} from "uuid";


import {ADD_TODOLIST, todoLists1, todoLists2} from "./todoListsReducer";

const initialState = {
    [todoLists1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS ', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'SASS', isDone: false}],
    [todoLists2]: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Chees', isDone: false},
        {id: v1(), title: 'Bread', isDone: false},
        {id: v1(), title: 'WHAAAAT', isDone: true},],
}

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_SPAN_TASK = 'CHANGE_SPAN_TASK'

export const TaskReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case ADD_TASK : {
            copyState = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoID] = [newTask, ...state[action.todoID]]
            return copyState;
        }
        case REMOVE_TASK : {
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].filter((f) => f.id !== action.id)
            return copyState
        }
        case CHANGE_TASK_STATUS : {
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].map((t) => t.id === action.id ? {
                ...t,
                isDone: action.isDone
            } : t)
            return copyState
        }
        case CHANGE_SPAN_TASK: {
            copyState = {...state}
            copyState[action.todoID] = copyState[action.todoID].map((t) => t.id === action.id ? {
                ...t,
                title: action.title
            } : t)
            return copyState
        }
        case ADD_TODOLIST: {
            return {[action.todoID]: [], ...state}
        }

        default:
            return state;
    }
}

export const AddTaskAC = (title, todoID) => {
    return {
        type: ADD_TASK, title, todoID
    }
}
export const removeTaskAC = (id, todoID) => {
    return {
        type: REMOVE_TASK, id, todoID
    }
}
export const changeTaskStatusAC = (isDone, id, todoID) => {
    return {
        type: CHANGE_TASK_STATUS, isDone, id, todoID
    }
}
export const changeSpanTaskAC = (id, todoID, title) => {
    return {
        type: CHANGE_SPAN_TASK, id, todoID, title
    }
}
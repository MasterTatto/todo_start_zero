
import {v1} from "uuid";
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const todoLists1 = v1()
export const todoLists2 = v1()
const initialState = [
    {title: 'What to learn', id: todoLists1, filter: 'all'},
    {title: 'What to buy', id: todoLists2, filter: 'all'},
]


const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_SPAN_TODO = 'CHANGE_SPAN_TODO'
const CHNAGE_FILTER_TODO = 'ChANGE_FILTER_TODO'

export const TodoListsReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case ADD_TODOLIST : {
            const newTodo = {title: action.title, id: action.todoID, filter: 'all'}
            return [...state, newTodo]

        }
        case REMOVE_TODOLIST : {
            copyState = {...state}
            copyState = [...state].filter(f => f.id !== action.todoID)
            return copyState;
        }
        case CHANGE_SPAN_TODO : {
            copyState = [...state]
            copyState = copyState.map((tl) => tl.id === action.todoID ? {...tl, title: action.title} : tl)
            return copyState
        }
        case CHNAGE_FILTER_TODO : {
            copyState = [...state]
            copyState = copyState.map((f) => f.id === action.todoID ? {...f, filter: action.fil} : f)
            return copyState
        }

        default:
            return state;
    }
}


export const addTodoListAC = (title) => {
    return {
        type: ADD_TODOLIST, title, todoID: v1()
    }
}
export const RemoveTodoAC = (todoID) => {
    return {
        type: REMOVE_TODOLIST, todoID
    }
}
export const ChangeSpanTodoAC = (todoID, title) => {
    return {
        type: CHANGE_SPAN_TODO, todoID, title
    }
}
export const ChangeFilterTodoAC = (title) => {
    return {
        type: CHNAGE_FILTER_TODO, title
    }
}
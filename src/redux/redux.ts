import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todoListReducer";


const reducerPac = combineReducers({
    task: tasksReducer,
    todoList: todolistsReducer
})


export const store = createStore(reducerPac)
export type AppRootStateType = ReturnType<typeof reducerPac>


import {combineReducers, createStore} from "redux";
import {TaskReducer} from "./taskReducer";
import {TodoListsReducer} from "./todoListsReducer";

const reducerPac = combineReducers({
    tasks: TaskReducer,
    todoLists: TodoListsReducer
})


export const store = createStore(reducerPac)
window.store = store
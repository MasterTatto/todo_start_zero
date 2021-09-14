import './App.css';
import TodoLists from "./bit/todoLists";
import React, {useState} from "react";
import {v1} from "uuid";
import InputForm from "./molecul/inputForm";
import {useDispatch, useSelector} from "react-redux";
import {AddTaskAC, changeSpanTaskAC, changeTaskStatusAC, removeTaskAC} from "./redux/taskReducer";
import {addTodoListAC, ChangeFilterTodoAC, ChangeSpanTodoAC, RemoveTodoAC} from "./redux/todoListsReducer";

function App() {

    const tasks = useSelector((state) => state.tasks)
    const todoLists = useSelector((state) => state.todoLists)
    const dispatch = useDispatch()


    function removeTask(id, todoID) {
        dispatch(removeTaskAC(id, todoID))
    }

    function addTask(title, todoID) {
        dispatch(AddTaskAC(title, todoID))
    }

    function changeTasksStatus(isDone, id, todoID) {
        dispatch(changeTaskStatusAC(isDone, id, todoID))
    }

    function changeSpanTasks(id, todoID, title) {
        dispatch(changeSpanTaskAC(id, todoID, title))
    }


    function buttonFilter(fil, todoID) {
        dispatch(ChangeFilterTodoAC(fil, todoID))
    }

    function changSpanTodoList(todoID, title) {
        dispatch(ChangeSpanTodoAC(todoID, title))
    }

    function removeTodoList(todoID) {
        dispatch(RemoveTodoAC(todoID))
    }

    function addTodoList(title) {
        dispatch(addTodoListAC(title))
    }

    return (
        <div className="app">
            <InputForm addItem={addTodoList}/>
            {todoLists.map((tl) => {

                function windowTask() {
                    switch (tl.filter) {
                        case 'active' :
                            return tasks[tl.id].filter(f => !f.isDone)

                        case 'completed':
                            return tasks[tl.id].filter(f => f.isDone)

                        default:
                            return tasks[tl.id]
                    }
                }

                return <TodoLists title={tl.title} tasks={windowTask()} buttonFilter={buttonFilter}
                                  removeTask={removeTask}
                                  addTask={addTask}
                                  changeTasksStatus={changeTasksStatus}
                                  removeTodoList={removeTodoList}
                                  filter={tl.filter} todoID={tl.id}
                                  changeSpanTasks={changeSpanTasks}
                                  changSpanTodoList={changSpanTodoList}/>
            })}

        </div>
    );
}

export default App;

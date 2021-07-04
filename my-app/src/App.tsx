import React, {useState} from 'react';

import './App.css';
import {v1} from "uuid";
import TodoList from "./TodoList";
import InputForm from "./InputForm";

export type FilterValue = 'all' | 'completed' | 'active'
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function App() {

    const todoID_1 = v1()
    const todoID_2 = v1()
    //
    const [tasks, setTasks] = useState({
        [todoID_1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false},
        ], [todoID_2]: [
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'cheeps', isDone: false},
        ]
    })
    //
    const [todoLists, setTodoLists] = useState([
        {id: todoID_1, title: 'What to learn', filter: 'all'},
        {id: todoID_2, title: 'What to buy', filter: 'all'},
    ])

    //
    function removeTask(todoID: string, id: string) {
        tasks[todoID] = tasks[todoID].filter((f) => {
            return f.id !== id;
        })
        setTasks({...tasks})
    }

//
    function filterButton(f: FilterValue, todoID: string) {
        const newFilter = todoLists.map(t => t.id === todoID ? {...t, filter: f} : t)
        setTodoLists(newFilter)
    }

//
    function addTask(todoID: string, title: string) {
        const newTask = {id: v1(), title, isDone: false}
        tasks[todoID] = [newTask, ...tasks[todoID]]
        setTasks({...tasks})
    }

    //
    function changeChecked(todoID: string, id: string, bool: boolean) {
        tasks[todoID] = tasks[todoID].map(t => t.id === id ? {...t, isDone: bool} : t)
        setTasks({...tasks})
    }

//
    function addTodoList(title: string) {
        const todoID = v1()
        const newTodoList = {id: todoID, title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [todoID]: []})
    }

//
    function removeTodo(todoID: string) {
        const removeList = todoLists.filter(f => f.id !== todoID)
        setTodoLists(removeList)
        delete tasks[todoID]
    }

    //
    function editSpanTitle(todoID: string, id: string, title: string) {
        tasks[todoID] = tasks[todoID].map((t) => {
            if (t.id === id) {
                return {...t, title}
            } else {
                return t
            }
        })
        setTasks({...tasks})
    }

    //
    function editSpanTodo(todoID: string, title: string) {
        const newTitle = todoLists.map((tl) => {
            if (tl.id === todoID) {
                return {...tl,title}
            } else {
                return tl
            }
        })
        setTodoLists(newTitle)
    }

    //
    return (
        <div className="App">
            <InputForm addItem={addTodoList}/>
            {todoLists.map((tl) => {
                function windowTasks() {
                    if (tl.filter === 'active') {
                        return tasks[tl.id].filter(f => !f.isDone)
                    }
                    if (tl.filter === 'completed') {
                        return tasks[tl.id].filter(f => f.isDone)
                    } else {
                        return tasks[tl.id]
                    }
                }

                return <TodoList title={tl.title} tasks={windowTasks()} key={tl.id} removeTask={removeTask} id={tl.id}
                                 removeTodo={removeTodo}
                                 editSpanTodo={editSpanTodo}
                                 editSpanTitle={editSpanTitle}
                                 filterButton={filterButton} addTask={addTask} changeChecked={changeChecked}/>
            })}

        </div>
    );
}

export default App;

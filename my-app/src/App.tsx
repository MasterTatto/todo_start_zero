import React, {useState} from 'react';

import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type FilterValue = 'all' | 'completed' | 'active'
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type TaskTypeProps = {
    [key: string]: Array<TaskType>
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValue
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskTypeProps>({
        [todoListId_1]: [
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'TS', isDone: false},
            {id: v1(), title: 'REACT', isDone: true}],

        [todoListId_2]: [
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'cheeps', isDone: true},
            {id: v1(), title: 'potate', isDone: false},
        ],
    })

    //
    function changeChecked(todoID: string, id: string, bool: boolean) {
        tasks[todoID] = tasks[todoID].map((f) => f.id === id ? {...f, isDone: bool} : f)
        setTasks({...tasks})
    }

    //
    function removeTasks(todoID: string, id: string) {
        tasks[todoID] = tasks[todoID].filter((f) => f.id !== id)
        setTasks({...tasks})
    }

    //
    function changeFilterBtn(filter: FilterValue, todoID: string) {
        let newFilter = todoLists.map(f => f.id === todoID ? {...f, filter: filter} : f)
        setTodoList(newFilter)
    }

    //
    function addTask(todoID: string, title: string) {
        const newTasks = {id: v1(), title, isDone: false}
        tasks[todoID] = [newTasks, ...tasks[todoID]]
        setTasks({...tasks})
    }

    //
    return (
        <div>
            {
                todoLists.map((tl) => {
                    function windowTasks() {
                        if (tl.filter === 'active') {
                            return tasks[tl.id].filter(f => f.isDone);
                        }
                        if (tl.filter === 'completed') {
                            return tasks[tl.id].filter(f => !f.isDone)
                        } else {
                            return tasks[tl.id]
                        }
                    }

                    return <TodoList
                        tasks={windowTasks()}
                        key={tl.id} title={tl.title}
                        id={tl.id} removeTasks={removeTasks}
                        changeChecked={changeChecked}
                        changeFilterBtn={changeFilterBtn}
                        addTask={addTask}
                    />
                })
            }
        </div>
    );
}

export default App;

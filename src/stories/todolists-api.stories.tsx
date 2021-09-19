import React, {useEffect, useState} from 'react'
import {APItasks, APItodoLists} from "../api/APItodoLists";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        APItodoLists.getTodo()
            .then((response) => {
                return response.data
            })
            .then(data => setState(data))
    }, [])


    return <div> {JSON.stringify(state)}

    </div>
}
//
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState('')

    function createTodoList(title: string) {
        APItodoLists.createTodo(title)
            .then((response) => {
                setState(response.data)
                console.log(response)
            })
    }

    return <div> {JSON.stringify(state)}
        <input type="text" value={value} placeholder={'type title for todo'}
               onChange={(e) => setValue(e.currentTarget.value)}/>
        <button onClick={() => createTodoList(value)}>Create</button>
    </div>
}
//
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState('')

    function deleteTodoList(id: string) {
        APItodoLists.deleteTodo(id)
            .then((response) => {
                setState(response.data)
                console.log(response)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <input type="text" value={value} placeholder={'type id todo list'}
               onChange={(e) => setValue(e.currentTarget.value)}/>
        <button onClick={() => deleteTodoList(value)}>delete todo</button>
    </div>
}
//
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')

    function updateTodo(id: string, title: string) {
        APItodoLists.updateTodo(id, title)
            .then((response) => {
                setState(response.data)
                console.log(response)
            })
    }

    return <div> {JSON.stringify(state)}
        <input type="text" placeholder={'todo id'} value={id} onChange={(e) => setId(e.currentTarget.value)}/>
        <input type="text" placeholder={'new todo title'} value={title}
               onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={() => updateTodo(id, title)}>Change title todo</button>
    </div>
}


export const getTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('8e919cac-31d3-4695-a7e2-e650119165a9')

    function showTasks(todoID: string) {
        APItasks.getTasks(todoID)
            .then((response) => {
                setState(response.data.items)
            })
    }

    return <div> {JSON.stringify(state)}
        <input type="text" placeholder={'type todoID'} value={todoID}
               onChange={(e) => setTodoID(e.currentTarget.value)}/>
        <button onClick={() => showTasks(todoID)}>show todo tasks</button>
    </div>
}
//
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('8e919cac-31d3-4695-a7e2-e650119165a9')
    const [title, setTitle] = useState('')

    function createTasks(todoID: string, title: string) {
        APItasks.createTasks(todoID, title)
            .then((response) => {
                    setState(response.data)
                }
            )
    }

    return <div> {JSON.stringify(state)}
        <input type="text" placeholder={'type new title'} value={title}
               onChange={(e) => setTitle(e.currentTarget.value)}/>
        <input type="text" placeholder={'type id todo'} value={todoID}
               onChange={(e) => setTodoID(e.currentTarget.value)}/>
        <button onClick={() => createTasks(todoID, title)}>Create task title</button>

    </div>
}
//
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('8e919cac-31d3-4695-a7e2-e650119165a9')
    const [taskID, setTasksID] = useState('')

    function deleteTasks(todoID: string, taskID: string) {
        APItasks.deleteTasks(taskID, todoID)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input type="text" placeholder={'type task id'} value={taskID}
               onChange={(e) => setTasksID(e.currentTarget.value)}/>
        <input type="text" placeholder={'type id todo'} value={todoID}
               onChange={(e) => setTodoID(e.currentTarget.value)}/>
        <button onClick={() => deleteTasks(todoID, taskID)}>delete task in todo</button>
    </div>
}
//
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('8e919cac-31d3-4695-a7e2-e650119165a9')
    const [taskID, setTasksID] = useState('')
    const [title, setTitle] = useState('')

    function updateTasks(todoID: string, taskID: string, title: string) {
        APItasks.updateTask(taskID, todoID, title)
            .then((response) => {
                setState(response.data)
            })
    }


    return <div> {JSON.stringify(state)}
        <input type="text" placeholder={'type task id'} value={taskID}
               onChange={(e) => setTasksID(e.currentTarget.value)}/>
        <input type="text" placeholder={'type id todo'} value={todoID}
               onChange={(e) => setTodoID(e.currentTarget.value)}/>
        <input type="text" placeholder={'type new title'} value={title}
               onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={() => updateTasks(todoID, taskID, title)}>change title task</button>
    </div>
}




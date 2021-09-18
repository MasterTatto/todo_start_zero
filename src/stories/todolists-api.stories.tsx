import React, {useEffect, useState} from 'react'
import {APItodoLists} from "../api/APItodoLists";
import axios from "axios";

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

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "WowWow"

        APItodoLists.createTodo(title)
            .then((response) => {
                setState(response.data)
                console.log(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = "cb76201f-bb05-4384-81ea-d2dafbe5d0f1"
        APItodoLists.deleteTodo(id)
            .then((response) => {
                setState(response.data)
                console.log(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = "8e919cac-31d3-4695-a7e2-e650119165a9"
        const title = 'Wow its a react'
        APItodoLists.updateTodo(id, title)
            .then((response) => {
                setState(response.data)
                console.log(response)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const getTasksme = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists/8e919cac-31d3-4695-a7e2-e650119165a9/tasks', {
            withCredentials: true,
            headers: {
                'API-KEY': 'f5568293-5f8e-4b65-9db2-3f550b4e7fcf'
            }
        }).then((response) => {
            setState(response.data.items)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'add new task'
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists/8e919cac-31d3-4695-a7e2-e650119165a9/tasks', {title}, {
            withCredentials: true,
            headers: {
                'API-KEY': 'f5568293-5f8e-4b65-9db2-3f550b4e7fcf'
            }
        })
            .then((response) => {
                    setState(response.data)
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/8e919cac-31d3-4695-a7e2-e650119165a9/tasks/45758f9f-05f3-4464-b1d2-bbd8c326dfcd', {
            withCredentials: true,
            headers: {
                'API-KEY': 'f5568293-5f8e-4b65-9db2-3f550b4e7fcf'
            }
        })
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = ' im change title'
        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/8e919cac-31d3-4695-a7e2-e650119165a9/tasks/c7e7b34d-78d7-4147-8616-06c49ed66d3b', {title}, {
            withCredentials: true,
            headers: {
                'API-KEY': 'f5568293-5f8e-4b65-9db2-3f550b4e7fcf'
            }
        })
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}




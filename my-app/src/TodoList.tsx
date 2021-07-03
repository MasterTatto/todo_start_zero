import React, {useState} from 'react';
import {FilterValue, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoID: string, id: string) => void
    id: string
    filterButton: (f: FilterValue, todoID: string) => void
    addTask: (todoID: string, title: string) => void
    changeChecked: (todoID: string, id: string, bool: boolean) => void
}
const TodoList = (props: TodoListPropsType) => {
    const liItem = props.tasks.map((t) => {
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => props.changeChecked(props.id, t.id, e.currentTarget.checked)}/>
            {t.title}
            <button onClick={() => props.removeTask(props.id, t.id)}>X</button>
        </li>
    })
    //
    const [value, setValue] = useState('')
    const outSpace = value.trim()
    //
    return (
        <div className={'todo'}>
            <div>
                <h1>{props.title}
                    <button>X</button>
                </h1>
            </div>
            <div>
                <input type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)} onKeyPress={(e) => {
                    if (e.key === 'Enter' && outSpace) {
                        props.addTask(props.id, outSpace)
                        setValue('')
                    } else {
                        return
                    }
                }
                }/>
                <button onClick={() => {
                    if(outSpace) {
                        props.addTask(props.id, outSpace)
                        setValue('')
                    } else {
                        return
                    }

                }}>Add
                </button>
            </div>
            <div>
                <ul>
                    {liItem}
                </ul>
            </div>
            <button onClick={() => props.filterButton('all', props.id)}>All</button>
            <button onClick={() => props.filterButton('active', props.id)}>Active</button>
            <button onClick={() => props.filterButton('completed', props.id)}>Completed</button>
        </div>
    );
};

export default TodoList;

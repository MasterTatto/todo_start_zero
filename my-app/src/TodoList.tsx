import React, {useState} from 'react';
import {FilterValue, TaskType} from "./App";

type todoPropsType = {
    tasks: Array<TaskType>
    title: string
    id: string
    removeTasks: (todoID: string, id: string) => void
    changeChecked: (todoID: string, id: string, bool: boolean) => void
    changeFilterBtn:(filter:FilterValue,id:string) => void
    addTask:(todoID:string,title:string) => void
}
const TodoList = (props: todoPropsType) => {

    const liItem = props.tasks.map((t) => {
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => props.changeChecked(props.id, t.id, e.currentTarget.checked)}/>
            {t.title}
            <button onClick={() => props.removeTasks(props.id, t.id)}>X</button>
        </li>

    })
//
    const [value,setValue] = useState('')
    //
    return (
        <div className={'tl'}>
            <div>
                <span>{props.title}
                    <button>X</button></span>
            </div>
            <div>
                <input type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
                <button onClick={() => {
                    props.addTask(props.id, value)
                    setValue('')
                }}>add</button>
            </div>
            <div>
                <ul>
                    {liItem}
                </ul>
            </div>
            <div>
                <button onClick={() => props.changeFilterBtn('all' , props.id)}>All</button>
                <button onClick={() => props.changeFilterBtn('active' , props.id)}>Completed</button>
                <button onClick={() => props.changeFilterBtn('completed' , props.id)}>Active</button>
            </div>
        </div>
    );
};

export default TodoList;

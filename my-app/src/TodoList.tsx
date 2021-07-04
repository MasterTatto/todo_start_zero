import React from 'react';
import {FilterValue, TaskType} from "./App";
import InputForm from "./InputForm";
import EditSpan from "./EditSpan";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoID: string, id: string) => void
    id: string
    filterButton: (f: FilterValue, todoID: string) => void
    addTask: (todoID: string, title: string) => void
    changeChecked: (todoID: string, id: string, bool: boolean) => void
    removeTodo: (todoId: string) => void
    editSpanTitle: (todoID: string, id: string, title: string) => void
    editSpanTodo: (todoID: string, title: string) => void

}
//
const TodoList = (props: TodoListPropsType) => {
    const liItem = props.tasks.map((t) => {
        //
        function editSpanTask(title: string) {
            props.editSpanTitle(props.id, t.id, title)
        }

        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => props.changeChecked(props.id, t.id, e.currentTarget.checked)}/>
            <EditSpan title={t.title} editSpanTask={editSpanTask}/>
            <button onClick={() => props.removeTask(props.id, t.id)}>X</button>
        </li>
    })

    //
    function addTask(title: string) {
        props.addTask(props.id, title)

    }

    //
function changeTitleTodo(title: string) {
        props.editSpanTodo(props.id,title)
}
    //
    return (
        <div className={'todo'}>
            <div>
                <h1><EditSpan title={props.title} editSpanTask={changeTitleTodo} />
                    <button onClick={() => props.removeTodo(props.id)}>X</button>
                </h1>
            </div>
            <InputForm addItem={addTask}/>
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

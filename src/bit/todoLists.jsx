import React, {useState} from 'react';
import InputForm from "../molecul/inputForm";
import EditSpan from "../molecul/editSpan";

const TodoLists = (props) => {


    const liItem = props.tasks.map((t) => {
        function changeEditSpanTask(title) {
            props.changeSpanTasks(t.id, props.todoID, title)
        }

        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => props.changeTasksStatus(e.currentTarget.checked, t.id, props.todoID)}/>
            <span><EditSpan title={t.title} changSpan={changeEditSpanTask}/></span>
            <button onClick={() => props.removeTask(t.id, props.todoID)}>X</button>
        </li>
    })

    function addTasks(title) {
        props.addTask(title, props.todoID)
    }

    function changeTodoTitle(title) {
        props.changSpanTodoList(props.todoID, title)
    }

    return (
        <div className={'todoList'}>
            <h1><EditSpan title={props.title} changSpan={changeTodoTitle}/>
                <button onClick={() => props.removeTodoList(props.todoID)}>X</button>
            </h1>
            <InputForm addItem={addTasks}/>
            <div>
                <ul className={'ul'}>
                    {liItem}

                </ul>
            </div>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn' : ''}
                    onClick={() => props.buttonFilter('all', props.todoID)}>All
                </button>
                <button className={props.filter === 'active' ? 'btn' : ''}
                        onClick={() => props.buttonFilter('active', props.todoID)}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btn' : ''}
                        onClick={() => props.buttonFilter('completed', props.todoID)}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoLists;

import React from 'react';
import {FilterType, TasksType} from './App';
import InputForm from './InputForm';
import SpanEdit from './SpanEdit';
import {Button} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

type TodoListPropsType = {
    tasks: Array<TasksType>;
    addButtonFilter: (f: FilterType, todoID: string) => void;
    removeTask: (id: string, todoID: string) => void;
    title: string;
    addTask: (title: string, todoID: string) => void;
    checkBox: (id: string, bool: boolean, todoID: string) => void;
    filter: string;
    id: string;
    removeTodoList: (id: string) => void;
    changeSpan: (title: string, todoID: string, id: string) => void;
    changeTodoTitle: (title: string, id: string) => void;
};

function TodoList(props: TodoListPropsType) {
    const liItem = props.tasks.map((t) => {
        function editSpan(title: string) {
            props.changeSpan(title, props.id, t.id);
        }

        return (
            <li key={t.id}>
                <Checkbox
                    name="gilad"
                    checked={t.isDone}
                    onChange={(e: any) =>
                        props.checkBox(t.id, e.currentTarget.checked, props.id)
                    }
                />
                <SpanEdit title={t.title} editSpan={editSpan}/>
                <Button
                    size={'small'}
                    variant="outlined"
                    color="primary"
                    onClick={() => props.removeTask(t.id, props.id)}
                >
                    X
                </Button>
            </li>
        );
    });

    //
    function addTask(title: string) {
        props.addTask(title, props.id);
    }

    //
    function editTodoSpan(title: string) {
        props.changeTodoTitle(title, props.id);
    }

    //
    return (
        <div className={'tl'}>
            <h1>
                <SpanEdit title={props.title} editSpan={editTodoSpan}/>
                <button onClick={() => props.removeTodoList(props.id)}>X</button>
            </h1>
            <InputForm addItem={addTask}/>
            <ul>{liItem}</ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn' : ''}
                    onClick={() => props.addButtonFilter('all', props.id)}
                >
                    All
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn' : ''}
                    onClick={() => props.addButtonFilter('completed', props.id)}
                >
                    Completed
                </button>
                <button
                    className={props.filter === 'active' ? 'btn' : ''}
                    onClick={() => props.addButtonFilter('active', props.id)}
                >
                    Active
                </button>
            </div>
        </div>
    );
}

export default TodoList;

import React from 'react';
import {FilterValue, TaskType} from "./App";
import InputForm from "./InputForm";
import EditSpan from "./EditSpan";
import {Button, Checkbox, Grid} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

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

        //
        return <li key={t.id}>
            <Checkbox checked={t.isDone}
                      onChange={(e) => props.changeChecked(props.id, t.id, e.currentTarget.checked)}/>
            <EditSpan title={t.title} editSpanTask={editSpanTask}/>
            <Button variant="outlined" color="primary" size={'small'}
                    onClick={() => props.removeTask(props.id, t.id)}><DeleteForeverOutlinedIcon/></Button>
            <Grid item xs={8}>


            </Grid>
        </li>
    })

    //
    function addTask(title: string) {
        props.addTask(props.id, title)

    }

    //
    function changeTitleTodo(title: string) {
        props.editSpanTodo(props.id, title)
    }

    //
    return (
        <div className={'todo'}>
            <div>
                <h1><EditSpan title={props.title} editSpanTask={changeTitleTodo}/>
                    <Button variant="contained"
                            color="secondary"
                        // className={classes.button}
                            startIcon={<DeleteOutlinedIcon/>}
                            onClick={() => props.removeTodo(props.id)}/>
                </h1>
            </div>
            <InputForm addItem={addTask}/>
            <div>
                <ul>
                    {liItem}
                </ul>
            </div>
            <Button variant="contained" onClick={() => props.filterButton('all', props.id)}>All</Button>
            <Button variant="contained" color="primary"
                    onClick={() => props.filterButton('active', props.id)}>Active</Button>
            <Button variant="contained" color="secondary"
                    onClick={() => props.filterButton('completed', props.id)}>Completed</Button>
        </div>
    );
};

export default TodoList;

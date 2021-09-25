import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from './EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatuses, TaskType} from './api/todolists-api'
import {removeTaskThunkCreator, updateTaskStatusTC, updateTaskTitleTC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    id: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskThunkCreator(props.todolistId, props.id))
    }, [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(updateTaskStatusTC(props.todolistId, props.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))

    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(updateTaskTitleTC(props.todolistId, props.id, newValue))
    }, [props.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})

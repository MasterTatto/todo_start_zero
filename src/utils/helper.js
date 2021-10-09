import {setAppIsErrorAC, setAppStatusAC} from "../app/app-reducer";
import {updateTaskAC} from "../features/TodolistsList/tasks-reducer";


export const helperTaskTC = (res, dispatch) => {
 if (res.data.resultCode > 0) {
        if (res.data.messages.length) {
            dispatch(setAppIsErrorAC(res.data.messages[0]))
        } else {
            dispatch(setAppIsErrorAC('some error'))
        }
        dispatch(setAppStatusAC('failed'))
    }
}

export const helperTaskCatchTC = (dispatch,err) => {
    dispatch(setAppIsErrorAC(err.message))
    dispatch(setAppStatusAC('failed'))
}
import {Dispatch} from "redux"
import {loginAPI} from "../api/todolists-api";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isAuth: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isAuth: action.value}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isAuth: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setLoginAC = (email: string, password: string) => ({type: 'APP/SET_LOGIN', email, password} as const)

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: { email: string, password: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return loginAPI.login(data.email, data.password)
        .then((res: any) => {
            dispatch(setAppStatusAC('idle'))
            res.data.resultCode === 0 && dispatch(setIsLoggedInAC(true))
            res.data.resultCode !== 0 && dispatch(setIsLoggedInAC(false))
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetLoginAT = ReturnType<typeof setLoginAC>






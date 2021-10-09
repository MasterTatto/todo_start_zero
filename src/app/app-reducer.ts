export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    isError: null as string | null,
    blockForm: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.statusLoad}

        case 'APP/SET-iSERROR' :

            return {...state, isError: action.isError}

        case "APP/SET-BLOCK_FORM":
            return {...state, blockForm: action.blockForm}
        default:
            return state
    }
}

export const setAppStatusAC = (statusLoad: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS', statusLoad
    } as const
}
export const setAppIsErrorAC = (isError: string | null) => {
    return {
        type: 'APP/SET-iSERROR', isError
    } as const
}

export const setblockFormAC = (blockForm: boolean) => {
    return {
        type: 'APP/SET-BLOCK_FORM', blockForm
    } as const
}

export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppIsErrorActionType = ReturnType<typeof setAppIsErrorAC>
export type setAppBlockFormActionType = ReturnType<typeof setblockFormAC>
type ActionsType = setAppStatusActionType | setAppIsErrorActionType | setAppBlockFormActionType
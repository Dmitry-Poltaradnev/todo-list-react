export enum ThemeType {
    White = 'white',
    Dark = 'dark',
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initAppState = {
    appStatus: 'loading' as RequestStatusType,
    theme: ThemeType.White
}

type InitAppStateType = typeof initAppState

type ToggleThemeType = ReturnType<typeof toggleThemeAC>
type ChangeStatusType = ReturnType<typeof changeStatusAC>

type AppReducerType = ToggleThemeType | ChangeStatusType

export const appReducer = (state: InitAppStateType = initAppState, action: AppReducerType): InitAppStateType => {
    switch (action.type) {
        case 'TOGGLE-THEME': {
            return {...state, theme: state.theme === ThemeType.White ? ThemeType.Dark : ThemeType.White}
        }
        case 'SET-APP-STATUS': {
            const {status} = action.payload
            return {...state, appStatus: status}
        }
        default:
            return state;
    }
}

export const toggleThemeAC = () => {
    return {type: 'TOGGLE-THEME'} as const;
}
export const changeStatusAC = (status: RequestStatusType) => {
    return {type: 'SET-APP-STATUS', payload: {status}} as const;
}
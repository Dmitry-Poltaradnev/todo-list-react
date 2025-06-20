import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum ThemeType {
  White = "white",
  Dark = "dark",
}

export enum ResultCode {
  Success = 0,
  Error = 1,
  Captcha = 10,
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

// const initAppState = {
//     appStatus: 'idle' as RequestStatusType,
//     theme: ThemeType.White,
//     error: null as string | null
// }

// type InitAppStateType = typeof initAppState

// type ToggleThemeType = ReturnType<typeof toggleThemeAC>
// export type ChangeStatusType = ReturnType<typeof changeStatusAppAC>
// export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
//
// type AppReducerType = ToggleThemeType | ChangeStatusType | SetAppErrorType

// export const appSlice = (state: InitAppStateType = initAppState, action: AppReducerType): InitAppStateType => {
//     switch (action.type) {
//         case 'TOGGLE-THEME': {
//             return {...state, theme: state.theme === ThemeType.White ? ThemeType.Dark : ThemeType.White}
//         }
//         case 'SET-APP-STATUS': {
//             const {status} = action.payload
//             return {...state, appStatus: status}
//         }
//         case 'SET-APP-ERROR': {
//             const {error} = action.payload
//             return {...state, error: error}
//         }
//         default:
//             return state;
//     }
// }
//
// export const toggleThemeAC = () => {
//     return {type: 'TOGGLE-THEME'} as const;
// }
// export const changeStatusAppAC = (status: RequestStatusType) => {
//     return {type: 'SET-APP-STATUS', payload: {status}} as const;
// }
// export const setAppErrorAC = (error: string | null) => {
//     return {type: 'SET-APP-ERROR', payload: {error}} as const;
// }

export const appSlice = createSlice({
  name: "app",
  initialState: {
    appStatus: "idle" as RequestStatusType,
    theme: ThemeType.White,
    error: null as string | null,
  },
  reducers: {
    toggleThemeAC(state) {
      state.theme = state.theme === ThemeType.White ? ThemeType.Dark : ThemeType.White
    },
    changeStatusAppAC(state, action: PayloadAction<RequestStatusType>) {
      state.appStatus = action.payload
    },
    setAppErrorAC(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const { toggleThemeAC, changeStatusAppAC, setAppErrorAC } = appSlice.actions
export const appReducer = appSlice.reducer

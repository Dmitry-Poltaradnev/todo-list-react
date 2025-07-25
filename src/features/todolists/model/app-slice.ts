import { createSlice } from "@reduxjs/toolkit"

export enum ThemeType {
  White = "white",
  Dark = "dark",
}

export enum ResultCode {
  Success = 0,
  Error = 1,
  Captcha = 10,
}

export enum RequestStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    appStatus: RequestStatus.Idle,
    theme: ThemeType.White,
    error: null as string | null,
  },
  reducers: (create) => {
    return {
      toggleThemeAC: create.reducer((state) => {
        state.theme = state.theme === ThemeType.White ? ThemeType.Dark : ThemeType.White
      }),
      changeStatusAppAC: create.reducer<RequestStatus>((state, action) => {
        state.appStatus = action.payload
      }),
      setAppErrorAC: create.reducer<string | null>((state, action) => {
        state.error = action.payload
      }),
    }
  },
  selectors: {
    selectAppStatus: (state) => state.appStatus,
    selectAppTheme: (state) => state.theme,
    selectAppError: (state) => state.error,
  },
})

export const { toggleThemeAC, changeStatusAppAC, setAppErrorAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectAppStatus, selectAppTheme, selectAppError } = appSlice.selectors

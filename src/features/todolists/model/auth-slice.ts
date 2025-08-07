import { authApi } from "../api/auth-api"
import { ResultCode } from "./app-slice"
import { handleServerError, handleNetworkError } from "../../../common/utils/utils"
import { LoginFormType } from "../../auth/ui/Login/Login"
import { createAppSlice } from "../../../common/utils/createAppSlice"
import { AUTH_TOKEN } from "../../../common/constants/constants"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk<{ isLoggedIn: boolean }, { data: LoginFormType }, { rejectValue: string }>(
      async ({ data }, { dispatch, rejectWithValue }) => {
        try {
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleServerError(dispatch, res.data)
            return rejectWithValue("Server error")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message || "Unknown error")
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    logoutTC: create.asyncThunk<{ isLoggedIn: boolean }, void, { rejectValue: string }>(
      async (_args, { dispatch, rejectWithValue }) => {
        try {
          const res = await authApi.logout()
          if (res.data.resultCode === ResultCode.Success) {
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleServerError(dispatch, res.data)
            return rejectWithValue("Server error")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message || "Unknown error")
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    meTC: create.asyncThunk<{ isLoggedIn: boolean }, void, { rejectValue: string }>(
      async (_args, { dispatch, rejectWithValue }) => {
        try {
          const res = await authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            return { isLoggedIn: true }
          } else {
            handleServerError(dispatch, res.data)
            return rejectWithValue("Server error")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message || "Unknown error")
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { loginTC, logoutTC, meTC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors
export const authReducer = authSlice.reducer

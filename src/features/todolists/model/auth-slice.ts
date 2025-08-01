import { createSlice } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { authApi } from "../api/auth-api"
import { ResultCode } from "./app-slice"
import { handleServerError, handleNetworkError } from "../../../common/utils/utils"
import { Path } from "../../../common/routing/Routing"
import { LoginFormType } from "../../auth/ui/Login/Login"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setIsLoggedAC: create.reducer<boolean>((state, action) => {
      state.isLoggedIn = action.payload
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { setIsLoggedAC } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors
export const authReducer = authSlice.reducer

export const loginTC = (data: LoginFormType, navigate: any) => (dispatch: Dispatch<any>) => {
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedAC(true))
        navigate(Path.Main)
      } else {
        handleServerError(dispatch, res.data)
      }
    })
    .catch((err: Error) => {
      handleNetworkError(dispatch, err)
    })
}

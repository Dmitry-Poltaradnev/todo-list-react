import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { authApi } from "../api/auth-api"
import { ResultCode } from "./app-slice"
import { handleServerAppError, handleServerNetworkError } from "../../../common/utils/utils"
import { Path } from "../../../common/routing/Routing"
import { LoginFormType } from "../../../common/components/Login/Login"

// const initialState = {
//     isLoggedIn: false
// }
//
// type InitStateType = typeof initialState
//
// type SetIsLoggedIndType = ReturnType<typeof setIsLoggedAC>
//
// type ActionsType = SetIsLoggedIndType | ChangeStatusType | SetAppErrorType
//
// export const authReducer = (state: InitStateType = initialState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case 'SET-IS-LOGGED-IN' : {
//             return {...state, isLoggedIn: action.payload}
//         }
//         default:
//             return state;
//     }
// }
//
// export const setIsLoggedAC = (value: boolean) => {
//     return {type: 'SET-IS-LOGGED-IN', payload: value} as const
// }
//
export const loginTC = (data: LoginFormType, navigate: any) => (dispatch: Dispatch<any>) => {
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedAC(true))
        navigate(Path.Main)
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err: Error) => {
      handleServerNetworkError(dispatch, err)
    })
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedAC(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setIsLoggedAC } = authSlice.actions
export const authReducer = authSlice.reducer

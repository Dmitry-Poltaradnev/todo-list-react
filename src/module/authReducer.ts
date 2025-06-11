import {ChangeStatusType, ResultCode, SetAppErrorType} from "./appReducer";
import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../common/utils";
import {LoginFormType} from "../login/Login";

const initialState = {
    isLoggedIn: false
}

type InitStateType = typeof initialState

type SetIsLoggedIndType = ReturnType<typeof setIsLoggedAC>

type ActionsType = SetIsLoggedIndType | ChangeStatusType | SetAppErrorType

export const authReducer = (state: InitStateType = initialState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN' : {
            return {...state, isLoggedIn: action.payload}
        }
        default:
            return state;
    }
}

export const setIsLoggedAC = (value: boolean) => {
    return {type: 'SET-IS-LOGGED-IN', payload: value} as const
}

export const loginTC = (data: LoginFormType) => (dispatch: Dispatch<ActionsType>) => {
    authApi.login(data).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedAC(true))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }).catch((err: Error) => {
        handleServerNetworkError(dispatch, err)
    })
}
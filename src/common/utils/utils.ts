import { Dispatch } from "redux"
import { setAppErrorAC } from "../../features/todolists/model/app-slice"
import { BaseResponse } from "../types/types"
import axios from "axios"

export const handleNetworkError = (dispatch: Dispatch, err: unknown) => {
  if (axios.isAxiosError(err)) {
    dispatch(setAppErrorAC(err.message))
  } else if (err instanceof Error) {
    dispatch(setAppErrorAC(err.message))
  }
}

export const handleAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
  const error = data?.messages[0] || "Unknown error occurred"
  dispatch(setAppErrorAC(error))
}

export const handleServerError = (dispatch: Dispatch, data: BaseResponse) => {
  dispatch(setAppErrorAC(data.messages[0] || "Unknown error occurred"))
}

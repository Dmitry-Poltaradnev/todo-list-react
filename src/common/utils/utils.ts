import { Dispatch } from "redux"
import { changeStatusAppAC, RequestStatus, setAppErrorAC } from "../../features/todolists/model/app-slice"
import { changeTodoListEntityStatusAC } from "../../features/todolists/model/todoList-slice"
import { BaseResponse } from "../types/types"

export const handleServerNetworkError = (dispatch: Dispatch, err: { message: string }) => {
  dispatch(setAppErrorAC(err.message))
  dispatch(changeStatusAppAC(RequestStatus.Failed))
}
export const handleServerAppError = (dispatch: Dispatch, data: BaseResponse) => {
  dispatch(setAppErrorAC(data.messages[0] || "Unknown error occurred"))
  dispatch(changeStatusAppAC(RequestStatus.Failed))
}
export const handleAppError = (dispatch: Dispatch, todolistId: string, err: { message: string }) => {
  dispatch(setAppErrorAC(err.message))
  dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: RequestStatus.Failed }))
}

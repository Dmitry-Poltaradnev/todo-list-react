import {Dispatch} from "redux";
import {changeStatusAppAC, setAppErrorAC} from "../module/appRedeucer";
import {ResponseType} from '../api/todolist-api'
import {changeTodoListEntityStatusAC} from "../module/todoListReducer";

export const handleServerNetworkError = (dispatch: Dispatch, err: { message: string }) => {
    dispatch(setAppErrorAC(err.message))
    dispatch(changeStatusAppAC('failed'))
}
export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setAppErrorAC((data.messages[0] || 'Unknown error occurred')))
    dispatch(changeStatusAppAC('failed'))
}
export const handleAppError = (dispatch: Dispatch, todolistId: string, err: { message: string }) => {
    dispatch(setAppErrorAC(err.message))
    dispatch(changeTodoListEntityStatusAC(todolistId, 'failed'))
}



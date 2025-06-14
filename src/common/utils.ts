import {Dispatch} from "redux";
import {changeStatusAppAC, setAppErrorAC} from "../module/app-slice";
import {ResponseType} from '../api/todolist-api'
import {changeTodoListEntityStatusAC} from "../module/todoList-slice";

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
    dispatch(changeTodoListEntityStatusAC({id: todolistId, entityStatus: 'failed'}))
}



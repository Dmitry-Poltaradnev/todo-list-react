import { store } from "../../app/store"

export type BaseResponse<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
  fieldsErrors: string[]
}

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

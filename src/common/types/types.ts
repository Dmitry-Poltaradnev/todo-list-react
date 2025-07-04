export type BaseResponse<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
  fieldsErrors: string[]
}

export enum RequestStatus {
  Loading = "loading",
  Success = "succeeded",
}

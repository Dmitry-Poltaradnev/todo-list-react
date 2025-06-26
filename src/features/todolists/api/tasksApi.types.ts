export type TaskType = {
  description: string
  title: string
  status: TaskStatus
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatus
  priority: number
  startDate: null | string
  deadline: null | string
}

export type GetTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string | null
}

export enum TaskStatus {
  New = 0,
  Complete = 2,
}

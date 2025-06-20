import { TaskType, UpdateTaskModelType } from "../model/task-slice"
import { BaseResponse } from "../../../common/types/types"
import { instance } from "../../../common/instance/instance"

type GetTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string | null
}

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  addTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModelType }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

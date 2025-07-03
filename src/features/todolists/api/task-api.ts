import { BaseResponse } from "../../../common/types/types"
import { instance } from "../../../common/instance/instance"
import { GetTasksResponse, TaskType, UpdateTaskModelType } from "./tasksApi.types"

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  // вместо такой записи const { todolistId, title } = payload
  // можно сразу писать { todolistId, title }: { todolistId: string; title: string }
  addTask({ todolistId, title }: { todolistId: string; title: string }) {
    return instance.post<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask({ todolistId, taskId }: { todolistId: string; taskId: string }) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask({ todolistId, taskId, model }: { todolistId: string; taskId: string; model: UpdateTaskModelType }) {
    return instance.put<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

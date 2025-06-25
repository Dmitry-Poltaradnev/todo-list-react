import { BaseResponse } from "../../../common/types/types"
import { instance } from "../../../common/instance/instance"
import { TodoListType } from "./todolistsApi.types"

export const todoListApi = {
  getTodoLists() {
    return instance.get<TodoListType[]>("/todo-lists")
  },
  addTodoList(title: string) {
    return instance.post<BaseResponse<{ item: TodoListType }>>("/todo-lists", { title })
  },
  updateTodoList({ todolistId, title }: { todolistId: string; title: string }) {
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}`, { title })
  },
  removeTodoList(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}

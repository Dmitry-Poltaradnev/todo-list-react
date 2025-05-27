import {instance} from "./todolist-api";
import {TaskType, UpdateTaskModelType} from "../module/taskReducer";

type GetTasksResponse = {
    items: TaskType[];
    totalCount: number;
    error: string | null;
}

type RemoveResponseType = {
    resultCode: number
    messages: string[],
    data: {}
}

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<RemoveResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    changeTaskStatus(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}







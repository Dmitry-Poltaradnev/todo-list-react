import {instance} from "./todolist-api";
import {TaskType, UpdateTaskModelType} from "../model/task-slice";

type GetTasksResponse = {
    items: TaskType[];
    totalCount: number;
    error: string | null;
}

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskStatus(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}







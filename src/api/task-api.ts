import {instance} from "./todolist-api";

const todoListId = '2dd09709-1bed-4c9a-894c-eb3c9f6c7177'

const taskId = '3224a0e8-efd8-49f8-a0cc-f4a3577ac4e1'

export const taskApi = {
    // getTasks(todolistId: string) {
    //     return instance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`)
    // },
    // addTask(todolistId: string, title: string) {
    //     return instance.post(`/todo-lists/${todoListId}/tasks`, {title})
    // },
    // removeTask(todolistId: string,) {
    //     return instance.delete(`/todo-lists/${todoListId}/tasks/${taskId}`)
    // },
    // changeTaskTitle (todolistId: string,taskId: string, title :string) {
    //     return instance.delete(`/todo-lists/${todoListId}/tasks/${taskId}` , {title})
    // },
}

type GetTasksResponse = {
    items: TaskType[];
    totalCount: number;
    error: string | null;
}


type TaskType = {
    id: string
    title: string
    description: null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null
    deadline: null
    addedDate: string
}
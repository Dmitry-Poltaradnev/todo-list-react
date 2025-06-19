import axios from "axios";

type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '0570d7e8-028b-4976-ac64-ded2181cd92b',
    }
})

export const todoListApi = {
    getTodoLists() {
        return instance.get<TodoListType[]>('/todo-lists')
    },
    addTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('/todo-lists', {title})
    },
    updateTodoList(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    },
    removeTodoList(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    }
}





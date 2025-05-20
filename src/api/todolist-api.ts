import axios from "axios";

// const token = '63106173-5b7a-4316-8c6a-5d706413c666'

// const config: AxiosRequestConfig = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': '0570d7e8-028b-4976-ac64-ded2181cd92b',
//         'Authorization': `Bearer ${token}`
//     }
// }

const instance = axios.create({
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
    updateTodoList(todoId: string, title: string) {
        return instance.put<ResponseType<{}>>(`/todo-lists/${todoId}`, {title})
    },
    removeTodoList(todoId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todoId}`)
    }
}

type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}



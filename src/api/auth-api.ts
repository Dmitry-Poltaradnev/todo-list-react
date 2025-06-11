import {instance} from "./todolist-api";
import {ResponseType} from './todolist-api'
import {LoginFormType} from "../login/Login";

export const authApi = {
    login(data: LoginFormType) {
        return instance.post<ResponseType<{ id: number }>>('/auth/login', data)
    }
}


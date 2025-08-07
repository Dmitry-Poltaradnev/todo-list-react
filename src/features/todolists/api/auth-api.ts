import { LoginFormType } from "../../auth/ui/Login/Login"
import { BaseResponse } from "../../../common/types/types"
import { instance } from "../../../common/instance/instance"

export const authApi = {
  login(data: LoginFormType) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("/auth/login", data)
  },
  logout() {
    return instance.delete<BaseResponse>("/auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("/auth/me")
  },
}

import { LoginFormType } from "../../../common/components/Login/Login"
import { BaseResponse } from "../../../common/types/types"
import { instance } from "../../../common/instance/instance"

export const authApi = {
  login(data: LoginFormType) {
    return instance.post<BaseResponse<{ id: number }>>("/auth/login", data)
  },
}

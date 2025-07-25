//  useSelector<AppRootStateType, TodoListDomainType[]>
// 1) AppRootStateType - типизация всего что возвращают редусеры
// 2) TodoListDomainType[] - тип того что мы именно хотим достать из всего store
// 3) но нужно смотреть файл useAppSelector

import { AppRootStateType } from "../../../common/types/types"
import { RequestStatus } from "./app-slice"

export const selectEntityStatusById = (todoListId: string) => (state: AppRootStateType) => {
  return state.todolists.find((item: any) => item.id === todoListId)?.entityStatus ?? RequestStatus.Idle
}

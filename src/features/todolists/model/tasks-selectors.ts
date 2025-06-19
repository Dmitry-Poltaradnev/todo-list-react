import {AppRootStateType} from "../../../app/store";
import {TaskType} from "./task-slice";

//  useSelector<AppRootStateType, TodoListDomainType[]>
// 1) AppRootStateType - типизация всего что возвращают редусеры
// 2) TodoListDomainType[] - тип того что мы именно хотим достать из всего store
// 3) но нужно смотреть файл useAppSelector

export const selectTasksByTodolistId = (todolistId: string) =>
    (state: AppRootStateType): TaskType[] => state.tasks[todolistId] || []
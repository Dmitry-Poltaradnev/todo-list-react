import {AppRootStateType} from "../store";
import {TodoListDomainType} from "./todoList-slice";

//  useSelector<AppRootStateType, TodoListDomainType[]>
// 1) AppRootStateType - типизация всего что возвращают редусеры
// 2) TodoListDomainType[] - тип того что мы именно хотим достать из всего store
// 3) но нужно смотреть файл useAppSelector
export const selectTodoLists = (state: AppRootStateType): TodoListDomainType[] => state.todolists
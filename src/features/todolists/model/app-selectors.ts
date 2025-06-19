import {AppRootStateType} from "../../../app/store";
import {RequestStatusType, ThemeType} from "./app-slice";

//  useSelector<AppRootStateType, TodoListDomainType[]>
// 1) AppRootStateType - типизация всего что возвращают редусеры
// 2) TodoListDomainType[] - тип того что мы именно хотим достать из всего store
// 3) но нужно смотреть файл useAppSelector

export const selectAppTheme = (state: AppRootStateType): ThemeType => state.app.theme
export const selectAppStatus = (state: AppRootStateType): RequestStatusType => state.app.appStatus
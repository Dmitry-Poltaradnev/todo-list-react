import {tasksReducer} from "../features/todolists/model/task-slice";
import {todoListReducer} from "../features/todolists/model/todoList-slice";
import {appReducer} from "../features/todolists/model/app-slice";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/todolists/model/auth-slice";

const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todoListReducer,
        tasks: tasksReducer,
    }
})
// TypeScript-утилита, которая извлекает тип возвращаемого значения этой функции.
export type AppRootStateType = ReturnType<typeof store.getState>;
// автоматическая типизация метода dispatch
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
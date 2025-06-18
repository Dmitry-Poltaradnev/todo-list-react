import {tasksReducer} from "./model/task-slice";
import {todoListReducer} from "./model/todoList-slice";
import {appReducer} from "./model/app-slice";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./model/auth-slice";

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
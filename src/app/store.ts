import { tasksReducer, tasksSlice } from "../features/todolists/model/task-slice"
import { todoListReducer, todoListSlice } from "../features/todolists/model/todoList-slice"
import { appReducer, appSlice } from "../features/todolists/model/app-slice"
import { configureStore } from "@reduxjs/toolkit"
import { authReducer, authSlice } from "../features/todolists/model/auth-slice"

const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todoListSlice.name]: todoListReducer,
    [tasksSlice.name]: tasksReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})
// TypeScript-утилита, которая извлекает тип возвращаемого значения этой функции.
export type AppRootStateType = ReturnType<typeof store.getState>
// автоматическая типизация метода dispatch
export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch;

export default store

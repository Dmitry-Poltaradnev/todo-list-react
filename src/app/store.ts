import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "../features/todolists/model/task-slice"
import { todoListReducer, todoListSlice } from "../features/todolists/model/todoList-slice"
import { appReducer, appSlice } from "../features/todolists/model/app-slice"
import { authReducer, authSlice } from "../features/todolists/model/auth-slice"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todoListSlice.name]: todoListReducer,
    [tasksSlice.name]: tasksReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

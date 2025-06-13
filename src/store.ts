import {tasksReducer} from "./module/task-slice";
import {todoListReducer} from "./module/todoList-slice";
import {appReducer} from "./module/app-slice";
import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./module/auth-slice";

const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todoListReducer,
        tasks: tasksReducer,
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
import {applyMiddleware, legacy_createStore, UnknownAction} from "redux";
import {taskReducer} from "./module/taskReducer";
import {todoListReducer} from "./module/todoListReducer";
import {appReducer, appSlice} from "./module/app-slice";
import {thunk, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer, authSlice} from "./module/auth-slice";

const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        tasks: taskReducer,
        todolists: todoListReducer,
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
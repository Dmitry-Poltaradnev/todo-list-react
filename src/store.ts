import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux";
import {taskReducer} from "./module/taskReducer";
import {todoListReducer} from "./module/todoListReducer";
import {appReducer} from "./module/appRedeucer";
import {thunk, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todoListReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// создаём тип AddDispatchType для dispatch может принимать не только action, но и ф-ции в виде unknown
export  type AddDispatchType = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
// Здесь мы создаем кастомный dispatch который может принимать и ф-ции типизируем его с помощъю generic
// чтобы в последствии использовать его вместо обычного dispatch
export const useAppDispatch = useDispatch<AddDispatchType>

// @ts-ignore
window.store = store
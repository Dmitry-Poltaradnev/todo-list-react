import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./module/taskReducer";
import {todoListReducer} from "./module/todoListReducer";
import {themeReducer} from "./module/themeRedeucer";
import {ThunkDispatch} from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todoListReducer,
    theme: themeReducer
})



export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
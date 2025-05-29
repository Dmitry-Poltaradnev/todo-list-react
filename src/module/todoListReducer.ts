import {todoListApi} from "../api/todolist-api";
import {changeStatusAppAC, ResultCode} from "./appRedeucer";

const initialState: TodoListDomainType[] = []

export type TodoListType = {
    id: string,
    title: string,
}

type TodoListReducerType =
    RemoveTodoListActionType
    | UpdateTodoListTitleActionType
    | AddTodoListActionType
    | SetTodoListActionType

type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleAC>
type AddTodoListActionType = ReturnType<typeof addTodoListAC>
type SetTodoListActionType = ReturnType<typeof setTodoListsAC>

type TodoListDomainType = TodoListType & {
    entityStatus: string
}

export const todoListReducer = (state: TodoListDomainType[] = initialState, action: TodoListReducerType): TodoListDomainType[] => {
    console.log(state)
    switch (action.type) {
        case 'SET-TODOLIST' : {
            const {todoLists} = action.payload
            return todoLists
        }
        case 'ADD-TODOLIST': {
            const {id, title} = action.payload
            return [{id: id, title, entityStatus: 'loading'}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload
            return state.filter(el => el.id !== id);
        }
        case 'UPDATE-TODOLIST-TITLE': {
            const {id, title} = action.payload
            return state.map(el => el.id === id ? {...el, title} : el);
        }
        default:
            return state;
    }
};

export const setTodoListsAC = (todoLists: TodoListDomainType[]) => {
    return {type: 'SET-TODOLIST', payload: {todoLists}} as const
}
export const addTodoListAC = (id: string, title: string) => {
    return {type: 'ADD-TODOLIST', payload: {id, title}} as const
}
export const removeTodoListAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
}
export const updateTodoListTitleAC = (id: string, title: string) => {
    return {type: 'UPDATE-TODOLIST-TITLE', payload: {id, title}} as const
}

// ==================Thunks
export const getTodosTC = () => (dispatch: any, getState: any) => {
    dispatch(changeStatusAppAC('loading'))
    todoListApi.getTodoLists().then(res => {
        const domainTodoLists: TodoListDomainType[] = res.data.map(todoList => ({...todoList, entityStatus: 'loading'}))
        dispatch(changeStatusAppAC('succeeded'))
        dispatch(setTodoListsAC(domainTodoLists))
    })
}
export const addTodoListTC = (title: string) => (dispatch: any, getState: any) => {
    todoListApi.addTodoList(title).then(res => {
        dispatch(addTodoListAC(res.data.data.item.id, title))
    })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: any, getState: any) => {
    todoListApi.removeTodoList(todolistId).then(res => {
        if (res.data.resultCode === ResultCode.Success) dispatch(removeTodoListAC(todolistId))
    })
}
export const changeTodoListTC = (todolistId: string, title: string) => (dispatch: any, getState: any) => {
    todoListApi.updateTodoList(todolistId, title).then(res => {
        if (res.data.resultCode === ResultCode.Success) dispatch(updateTodoListTitleAC(todolistId, title))
    })
}
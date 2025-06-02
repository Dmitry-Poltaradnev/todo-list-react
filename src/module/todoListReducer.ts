import {todoListApi} from "../api/todolist-api";
import {changeStatusAppAC, RequestStatusType, ResultCode, setAppErrorAC} from "./appRedeucer";

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
    | changeTodoListEntityStatusType

type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleAC>
type AddTodoListActionType = ReturnType<typeof addTodoListAC>
type SetTodoListActionType = ReturnType<typeof setTodoListsAC>
type changeTodoListEntityStatusType = ReturnType<typeof changeTodoListEntityStatusAC>

export type TodoListDomainType = TodoListType & {
    entityStatus: RequestStatusType
}

export const todoListReducer = (state: TodoListDomainType[] = initialState, action: TodoListReducerType): TodoListDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLIST' : {
            const {todoLists} = action.payload
            return todoLists
        }
        case 'ADD-TODOLIST': {
            const {id, title} = action.payload
            return [{id: id, title, entityStatus: 'idle'}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload
            return state.filter(el => el.id !== id);
        }
        case 'UPDATE-TODOLIST-TITLE': {
            const {id, title} = action.payload
            return state.map(el => el.id === id ? {...el, title} : el);
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS' : {
            const {id, entityStatus} = action.payload
            return state.map(el => el.id === id ? {...el, entityStatus: entityStatus} : el)
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
export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload: {id, entityStatus}} as const;
}
// ==================Thunks
export const getTodosTC = () => (dispatch: any, getState: any) => {
    dispatch(changeStatusAppAC('loading'))
    todoListApi.getTodoLists().then(res => {
        const domainTodoLists: TodoListDomainType[] = res.data.map(todoList => ({...todoList, entityStatus: 'idle'}))
        dispatch(setTodoListsAC(domainTodoLists))
        dispatch(changeStatusAppAC('succeeded'))
    })
}
export const addTodoListTC = (title: string) => (dispatch: any, getState: any) => {
    todoListApi.addTodoList(title).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(addTodoListAC(res.data.data.item.id, title))
            dispatch(changeStatusAppAC('succeeded'))
        } else {
            dispatch(setAppErrorAC((res.data.messages[0] || 'Unknown error occurred')))
            dispatch(changeStatusAppAC('loading'))
        }
    }).catch(err => {
        console.log(`при добавлении ${err.message}`)
        dispatch(setAppErrorAC('Error while adding todoList'))
    })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: any, getState: any) => {
    dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
    todoListApi.removeTodoList(todolistId).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeTodoListEntityStatusAC(todolistId, 'succeeded'))
            dispatch(removeTodoListAC(todolistId))
        }
    })
}
export const changeTodoListTC = (todolistId: string, title: string) => (dispatch: any, getState: any) => {
    todoListApi.updateTodoList(todolistId, title).then(res => {
        if (res.data.resultCode === ResultCode.Success) dispatch(updateTodoListTitleAC(todolistId, title))
    })
}
// const initialState: TodoListType[] = [
//     {id: todolistID1, title: 'What to learn'},
//     {id: todolistID2, title: 'What to buy'},
// ]

import {todoListApi} from "../api/todolist-api";

const initialState: TodoListType[] = []

type TodoListType = {
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

export const todoListReducer = (state: TodoListType[] = initialState, action: TodoListReducerType): TodoListType[] => {
    switch (action.type) {
        case 'SET-TODOLIST' : {
            const {todoLists} = action.payload
            return [...todoLists]
        }
        case 'ADD-TODOLIST': {
            const {id, title} = action.payload
            return [{id: id, title}, ...state]
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

export const setTodoListsAC = (todoLists: TodoListType[]) => {
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
    todoListApi.getTodoLists().then(res => {
        dispatch(setTodoListsAC(res.data))
    })
}
export const addTodoListTC = (title: string) => (dispatch: any, getState: any) => {
    todoListApi.addTodoList(title).then(res => {
        dispatch(addTodoListAC(res.data.data.item.id, title))
    })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: any, getState: any) => {
    todoListApi.removeTodoList(todolistId).then(res => {
        if (res.data.resultCode === 0) dispatch(removeTodoListAC(todolistId))
    })
}
export const changeTodoListTC = (todolistId: string, title: string) => (dispatch: any, getState: any) => {
    todoListApi.updateTodoList(todolistId, title).then(res => {
        if (res.data.resultCode === 0) dispatch(updateTodoListTitleAC(todolistId, title))
    })
}
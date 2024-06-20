import {TodolistType} from "../App";
import {v1} from "uuid";


export const todoListReducer = (state: TodolistType[], action: TodoListReducerType): TodolistType[] => {
    switch (action.type) {
        case  'REMOVE-TODOlIST' : {
            return state.filter(el => el.id !== action.payload.id)
        }
        // Todo: you need to fix add-todolist
        case  'ADD-TODOLIST' : {
            const newTodoList: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'}
            console.log(newTodoList)
            return [...state, newTodoList]
        }
        case  'UPDATE-TODOlIST-TITLE' : {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.title} : el)
        }
        default:
            return state
    }
}

type TodoListReducerType = RemoveTodoList | AddTodoList | UpdateTodoListTitle

export const UpdateTodoListTitleAC = (todoListId: string, title: string): UpdateTodoListTitle => {
    return {
        type: 'UPDATE-TODOlIST-TITLE',
        payload: {
            todoListId,
            title
        }
    }
}
type UpdateTodoListTitle = {
    type: 'UPDATE-TODOlIST-TITLE'
    payload: {
        todoListId: string,
        title: string
    }
}

// =======
export const AddTodoListAC = (title: string): AddTodoList => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}
type AddTodoList = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
    }
}

// =====
export const RemoveTodoListAC = (id: string): RemoveTodoList => {
    return {
        type: 'REMOVE-TODOlIST',
        payload: {
            id
        }
    } as const
}
type RemoveTodoList = {
    type: 'REMOVE-TODOlIST'
    payload: {
        id: string
    }
}
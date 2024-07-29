import {TodolistType} from "../App";
import {v1} from "uuid";

const initialState: Array<TodolistType> = []

export const todoListReducer = (state: TodolistType[] = initialState, action: TodoListReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload
            return state.filter(el => el.id !== id);
        }
        case 'ADD-TODOLIST': {
            const {id, title} = action.payload
            return [...state, {id: id, title, filter: 'all'}]
        }
        case 'UPDATE-TODOLIST-TITLE': {
            const {todoListId, title} = action.payload
            return state.map(el => el.id === todoListId ? {...el, title} : el);
        }
        default:
            return state;
    }
};

type TodoListReducerType = RemoveTodoList | AddTodoList | UpdateTodoListTitle;

export const UpdateTodoListTitleAC = (todoListId: string, title: string): UpdateTodoListTitle => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todoListId,
            title
        }
    }
};
type UpdateTodoListTitle = {
    type: 'UPDATE-TODOLIST-TITLE',
    payload: {
        todoListId: string,
        title: string
    }
};

export const AddTodoListAC = (title: string): AddTodoList => {
    const id = v1() // генерируем новый id
    return {
        type: 'ADD-TODOLIST',
        payload: {
            id,
            title
        }
    };
};
type AddTodoList = {
    type: 'ADD-TODOLIST',
    payload: {
        id: string,
        title: string
    }
};

export const RemoveTodoListAC = (id: string): RemoveTodoList => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    };
};
type RemoveTodoList = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string
    }
};

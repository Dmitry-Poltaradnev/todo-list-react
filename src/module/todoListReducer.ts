import {TodolistType} from "../App";
import {v1} from "uuid";

export const todoListReducer = (state: TodolistType[], action: TodoListReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'};
            return [...state, newTodoList];
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.title} : el);
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
    const  id = v1() // генерируем новый id
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

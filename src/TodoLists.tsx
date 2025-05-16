import React from 'react';
import {Todolist} from "./TodoList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type TodolistType = {
    id: string
    title: string
}

export const TodoLists = () => {

    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    return (
        <ol>
            {todoLists.map(todoList => <Todolist key={todoList.id} todoList={todoList}/>)}
        </ol>
    )
};


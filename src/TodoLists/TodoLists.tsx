import React from 'react';
import {Todolist} from "./TodoList/TodoList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {TodoListDomainType} from "../module/todoListReducer";

export const TodoLists = () => {

    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todolists)

    return (
        <ol>
            {todoLists.map(todoList => <Todolist key={todoList.id} todoList={todoList}/>)}
        </ol>
    )
};


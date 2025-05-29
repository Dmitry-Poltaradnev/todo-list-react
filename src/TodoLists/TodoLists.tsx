import React from 'react';
import {Todolist} from "./TodoList/TodoList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {TodoListType} from "../module/todoListReducer";


export const TodoLists = () => {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)

    return (
        <ol>
            {todoLists.map(todoList => <Todolist key={todoList.id} todoList={todoList}/>)}
        </ol>
    )
};


import React, {memo, useEffect} from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoListDomainType} from "../../model/todoList-slice";
import {addTaskTC, setTasksTC} from "../../model/task-slice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {Tasks} from "./Tasks/Tasks";
import s from './TodoList.module.css'
import {TodoListTitle} from "./TodoListTitle";

type PropsType = {
    todoList: TodoListDomainType
}

export const Todolist = memo(({todoList}: PropsType) => {

    const dispatch = useAppDispatch();

    const todolistId = todoList.id

    useEffect(() => {
        dispatch(setTasksTC(todolistId))
    }, [dispatch, todolistId]);


    const addTaskHandler = (title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }

    return (
        <div className={s.todoListWrapper}>
            <TodoListTitle todoList={todoList}/>
            <AddItemForm entityTodoList={todoList.entityStatus} addItem={addTaskHandler}/>
            <Tasks todolistId={todolistId}/>
        </div>
    )
})
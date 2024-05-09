import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterActiveType} from "./App";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeItem: (id: string) => void
    addItem: (title: string) => void
    changeFilter: (value: FilterActiveType) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addItem(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompleted = () => props.changeFilter('completed')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>Add Task
                </button>
            </div>
            <ul>
                {props.tasks.map((item) => {
                    const onRemoveHandler = () => {
                        props.removeItem(item.id)
                    }
                    return <li key={item.id}><input checked={item.isDone} type="checkbox"/><span>{item.title}</span>
                        <button onClick={onRemoveHandler}>X</button>
                    </li>
                })}
            </ul>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompleted}>Completed</button>
        </div>
    );
};


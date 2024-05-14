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
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterActiveType
}

export const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Field is required')
            return
        }
        props.addItem(newTaskTitle.trim())
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
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>Add Task</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((item) => {
                    const onRemoveHandler = () => {
                        props.removeItem(item.id)
                    }
                    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(item.id, e.currentTarget.checked)
                    }

                    return <li className={item.isDone ? 'is-done' : ''} key={item.id}><input checked={item.isDone} onChange={onChangeStatus} type="checkbox"/><span>{item.title}</span>
                        <button onClick={onRemoveHandler}>X</button>
                    </li>
                })}
            </ul>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompleted}>Completed</button>
        </div>
    );
};


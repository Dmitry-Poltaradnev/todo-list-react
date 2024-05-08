import React from 'react';
import {FilterActiveType} from "./App";

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeItem: (id:number) => void
    changeFilter: (value: FilterActiveType) => void
}

export const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>Added</button>
            </div>
            <ul>
                {props.tasks.map((item, index) => (
                    <li key={index}><input checked={item.isDone} type="checkbox"/><span>{item.title}</span>
                        <button onClick={() => props.removeItem(item.id)}>X</button>
                    </li>
                ))
                }
            </ul>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    );
};


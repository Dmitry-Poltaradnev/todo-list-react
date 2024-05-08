import React from "react";

type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TitlePropsType = {
    title: string
    tasks: Array<TasksPropsType>
}

export function TodoList(props: TitlePropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((item, index) => (
                    <li key={index}><input type="checkbox" checked={item.isDone}/> <span>{item.title}</span>
                        <button>x
                        </button>
                    </li>))}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
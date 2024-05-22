import React, {useState} from 'react';
import './App.css';
import {massTaskPropsType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed';

export default function App() {  // Изменено на экспорт по умолчанию
    const titleTask = 'Task';

    const [stateMass, setStateTask] = useState(
        [{id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'SofSkill', isDone: false}]
    );

    // remove item
    const removeItem = (itemId: string) => {
        let newMass = stateMass.filter(item => item.id !== itemId);
        setStateTask(newMass);
    };

    // add item
    const addItem = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        const newMassTask = [newTask, ...stateMass];
        setStateTask(newMassTask);
    };
    // update item
    const changeTaskStatus = (itemId: string, newIsDoneValue: boolean) => {
        // first option with find
        // const taskForUpdate: massTaskPropsType | undefined = stateMass.find(item => item.id === itemId)
        // if (taskForUpdate) taskForUpdate.isDone = !taskForUpdate.isDone
        // setStateTask([...stateMass])
        // ====================
        // second option with map
        const newMassState = stateMass.map(item => (item.id === itemId ? {...item, isDone: newIsDoneValue} : item))
        setStateTask(newMassState)
    }

    return (
        <div className="App">
            <TodoList massTasks={stateMass}
                      titleTask={titleTask}
                      removeItem={removeItem}
                      addItem={addItem}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

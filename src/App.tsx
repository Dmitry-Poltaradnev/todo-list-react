import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterActiveType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ])

    console.log(tasks)

    let [filter, setFilter] = useState<FilterActiveType>('all')

    function changeFilter(value: FilterActiveType) {
        setFilter(value)
    }

    let tasksForTodoLists = tasks
    if (filter === 'completed') {
        tasksForTodoLists = tasks.filter(item => item.isDone)
    }
    if (filter === 'active') {
        tasksForTodoLists = tasks.filter(item => !item.isDone)
    }

    function removeItem(id: string) {
        let filteredTasks = tasks.filter(item => id !== item.id)
        setTasks(filteredTasks)
    }

    function addItem(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className='App'>
            <TodoList addItem={addItem} removeItem={removeItem} title={'Technologies'} tasks={tasksForTodoLists}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

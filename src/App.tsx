import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export type FilterActiveType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: false},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
        {id: 4, title: 'React', isDone: false}
    ])

    let [filter,setFilter] = useState<FilterActiveType>('all')


    function changeFilter(value:FilterActiveType){
      setFilter(value)
    }

    let tasksForTodoLists = tasks
    if(filter === 'completed'){
        tasksForTodoLists = tasks.filter(item => item.isDone)
    }
    if(filter === 'active'){
        tasksForTodoLists = tasks.filter(item => !item.isDone)
    }

    function removeItem(id: number) {
        let filteredTasks = tasks.filter(item => id !== item.id)
        setTasks(filteredTasks)
    }

    return (
        <div className='App'>
            <TodoList removeItem={removeItem} title={'Technologies'} tasks={tasksForTodoLists} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

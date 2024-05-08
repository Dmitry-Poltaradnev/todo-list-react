import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    const task1 = [
        {id:1, title:'HTML', isDone: false},
        {id:2, title:'CSS', isDone: true},
        {id:3, title:'JS', isDone: false},
        {id:4, title:'React', isDone: false}
    ]
    const task2 = [
        {id:1, title:'FirstBook', isDone: false},
        {id:2, title:'SecondBook', isDone: false},
        {id:3, title:'ThirdBook', isDone: false}
    ]
    const task3 = [
        {id:1, title:'FirstBook', isDone: false},
        {id:2, title:'SecondBook', isDone: false},
        {id:3, title:'ThirdBook', isDone: false}
    ]
    const task4 = [
        {id:1, title:'FirstBook', isDone: false},
        {id:2, title:'SecondBook', isDone: false},
        {id:3, title:'ThirdBook', isDone: false}
    ]


    return (
        <div className='App'>
            <TodoList title={'Hard Skill'} tasks={task1}/>
            <TodoList title={'Technologies'} tasks={task2}/>
        </div>
    );
}

export default App;

import React, {useState, KeyboardEvent} from 'react';
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type massTaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    titleTask: string
    massTasks: Array<massTaskPropsType>
    removeItem: (itemId: string) => void
    addItem: (title: string) => void
}
export const TodoList = ({titleTask, massTasks, removeItem, addItem}: TodoListPropsType) => {

    // UI logic filter
    const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All')
    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }
    const getFilteredTask = (stateMass: Array<massTaskPropsType>, filterValue: FilterValuesType): Array<massTaskPropsType> => {
        switch (filterValue) {
            case 'Active':
                return stateMass.filter(item => !item.isDone)
            case 'Completed':
                return stateMass.filter(item => item.isDone)
            default:
                return stateMass
        }
    }
    const filteredTask: Array<massTaskPropsType> = getFilteredTask(massTasks, filter)
    // ====
    // add item logic
    const [stateTitle, setStateTitle] = useState('')
    console.log(stateTitle)

    const onClickInput = () => {
        if (stateTitle.trim().length !== 0) {
            addItem(stateTitle)
            setStateTitle('')
        }
    }
    // ====
    const list =
        filteredTask.length === 0 ? <div>Your list is empty</div> : filteredTask.map(item => (
            <li key={item.id}><input checked={item.isDone} type="checkbox"/>
                <span>{item.title}</span>
                <Button title='X' onClickHandler={() => removeItem(item.id)}/>
            </li>
        ))

    return (
        <div className={'todoList'}>
            <h3>{titleTask}</h3>
            {stateTitle.length > 20 && <div>Max name length is 20 symbols</div>}
            <div>
                <input
                    value={stateTitle}
                    onChange={e => setStateTitle(e.currentTarget.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && stateTitle ? onClickInput() : ''}
                    type='text'/>
                <Button disabled={stateTitle.trim().length === 0 || stateTitle.length > 20}
                        onClickHandler={onClickInput}
                        title='Add task'/>
            </div>
            {stateTitle.length > 10 && <div>The name of your task is too big</div>}
            <div>
                <ul>
                    {list}
                </ul>
            </div>
            <Button onClickHandler={() => changeFilter('All')} title='All'/>
            <Button onClickHandler={() => changeFilter('Completed')} title='Completed'/>
            <Button onClickHandler={() => changeFilter('Active')} title='Active'/>
        </div>
    );
}
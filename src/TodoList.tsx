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
    changeTaskStatus: (itemId: string, newIsDoneValue: boolean) => void
}
export const TodoList = ({
                             titleTask
                             , massTasks
                             , removeItem
                             , addItem
                             , changeTaskStatus
                         }: TodoListPropsType) => {

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
            <li className={item.isDone ? 'unActiveTask' : ''} key={item.id}>
                <input
                    onChange={(e) => changeTaskStatus(item.id, e.currentTarget.checked)}
                    checked={item.isDone}
                    type="checkbox"/>
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
            <Button
                classes={filter === 'All' ? 'activeFilter' : ''}
                onClickHandler={() => changeFilter('All')}
                title='All'/>
            <Button
                classes={filter === 'Completed' ? 'activeFilter' : ''}
                onClickHandler={() => changeFilter('Completed')}
                title='Completed'/>
            <Button
                classes={filter === 'Active' ? 'activeFilter' : ''}
                onClickHandler={() => changeFilter('Active')}
                title='Active'/>
        </div>
    );
}
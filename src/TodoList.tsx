import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    updateTask: (todoListId: string, taskId: string, task: string,) => void
    updateTodoListTitle: (todoListId: string, title: string) => void
    todoListId: string
    title: string
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    removeTodoList: (todoListId: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             addTask,
                             changeTaskStatus,
                             todoListId,
                             removeTodoList,
                             updateTask,
                             updateTodoListTitle
                         }: PropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const getFilterTodolist = (tasks: TaskType[], filter: FilterValuesType) => {
        if (filter === 'active') {
            return tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            return tasks.filter(task => task.isDone)
        }
        return tasks
    }

    const changeFilter = (status: FilterValuesType) => {
        setFilter(status)
    }

    const newFilteredTasks = getFilterTodolist(tasks, filter)

    const changeTitleTaskHandler = (newTitle: string, taskId: string) => {
        updateTask(todoListId, taskId, newTitle)
    }


    const tasksList = <ul>
        {newFilteredTasks.map((task) => {

            const removeTaskHandler = () => {
                removeTask(todoListId, task.id)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(todoListId, task.id, newStatusValue)
            }

            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan changeTitleHandler={(newTitle) => changeTitleTaskHandler(newTitle, task.id)}
                              oldTitle={task.title}/>
                <Button onClick={removeTaskHandler} title={'x'}/>
            </li>
        })}
    </ul>

    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }

    const changeTodoListTitleHandler = (title: string) => {
        updateTodoListTitle(todoListId, title)
    }

    return (
        <div>
            <div>
                <EditableSpan oldTitle={title} changeTitleHandler={changeTodoListTitleHandler}/>
                <Button title='X' onClick={() => removeTodoList(todoListId)}/>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : tasksList
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilter('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilter('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}
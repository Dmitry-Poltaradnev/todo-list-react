import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";

type PropsType = {
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
                             removeTodoList
                         }: PropsType) => {

    // const [taskTitle, setTaskTitle] = useState('')
    //
    // const [error, setError] = useState<string | null>(null)

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

    // const addTaskHandler = () => {
    //     if (taskTitle.trim() !== '') {
    //         addTask(todoListId, taskTitle.trim())
    //         setTaskTitle('')
    //     } else {
    //         setError('Title is required')
    //     }
    // }
    //
    // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTaskTitle(event.currentTarget.value)
    // }
    //
    // const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (event.key === 'Enter') {
    //         addTaskHandler()
    //     }
    // }


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
                <span>{task.title}</span>
                <Button onClick={removeTaskHandler} title={'x'}/>
            </li>
        })}
    </ul>

    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }


    return (
        <div>
            <div>
                <h3>{title}</h3>
                <Button title='X' onClick={() => removeTodoList(todoListId)}/>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
                {/*<input*/}
                {/*    className={error ? 'error' : ''}*/}
                {/*    value={taskTitle}*/}
                {/*    onChange={changeTaskTitleHandler}*/}
                {/*    onKeyUp={addTaskOnKeyUpHandler}*/}
                {/*/>*/}
                {/*<Button title={'+'} onClick={addTaskHandler}/>*/}
                {/*{error && <div className={'error-message'}>{error}</div>}*/}
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
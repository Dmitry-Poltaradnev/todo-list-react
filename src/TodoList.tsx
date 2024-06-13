import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, useState} from "react";
// import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, ListItemSx} from "./TodoList.styles";


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


    const tasksList = <List>
        {newFilteredTasks.map((task) => {

            const removeTaskHandler = () => {
                removeTask(todoListId, task.id)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(todoListId, task.id, newStatusValue)
            }

            return <ListItem
                sx={ListItemSx(task.isDone)}
                key={task.id}>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan changeTitleHandler={(newTitle) => changeTitleTaskHandler(newTitle, task.id)}
                              oldTitle={task.title}/>
                <IconButton onClick={removeTaskHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        })}
    </List>

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
                <IconButton onClick={() => removeTodoList(todoListId)} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Task list is empty</p>
                    : tasksList
            }
            <Box sx={filterButtonsContainerSx}>
                <Button onClick={() => changeFilter('all')}
                        variant={filter === 'all' ? "outlined" : "contained"}>All</Button>
                <Button onClick={() => changeFilter('active')}
                        variant={filter === 'active' ? "outlined" : "contained"}>Active</Button>
                <Button onClick={() => changeFilter('completed')}
                        variant={filter === 'completed' ? "outlined" : "contained"}>Completed</Button>
            </Box>
        </div>
    )
}
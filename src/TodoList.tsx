import {memo, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "./TodoList.styles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {removeTodoListAC, updateTodoListTitleAC} from "./module/todoListReducer";
import {TodolistType} from "./TodoLists";
import {addTaskAC, TaskType} from "./module/taskReducer";
import {Task} from "./Task";

type PropsType = {
    todoList: TodolistType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export const Todolist = memo(({todoList}: PropsType) => {

    const dispatch = useDispatch();

    const todoListId = todoList.id

    const tasks: TaskType[] = useSelector<AppRootStateType, any>(state => state.tasks[todoListId])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const filterTasks = (filter: FilterValuesType, tasks: TaskType[]) => {
        if (filter === 'active') {
            return tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            return tasks.filter(task => task.isDone)
        }
        return tasks
    }

    const filteredTasks = filterTasks(filter, tasks)

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }

    const changeTodoListTitleHandler = (title: string) => {
        dispatch(updateTodoListTitleAC(todoListId, title))
    }

    return (
        <div style={{border: "solid 1px blue", borderRadius: '10px', padding: '20px'}}>
            <div>
                <EditableSpan oldTitle={todoList.title} changeTitleHandler={changeTodoListTitleHandler}/>
                <IconButton onClick={() => dispatch(removeTodoListAC(todoListId))} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Task list is empty</p>
                    : <ul>
                        {filteredTasks.map((task: any) => <Task key={task.id} todoListId={todoListId} task={task}/>)}
                    </ul>
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
})
import {memo, useEffect, useState} from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "../../TodoList.styles";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../store";
import {changeTodoListTC, removeTodoListTC, TodoListType} from "../../module/todoListReducer";
import {addTaskTC, setTasksTC, TaskType} from "../../module/taskReducer";
import {Task} from "./Tasks/Task";

type PropsType = {
    todoList: TodoListType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export const Todolist = memo(({todoList}: PropsType) => {

    const dispatch = useAppDispatch();

    const todolistId = todoList.id

    useEffect(() => {
        dispatch(setTasksTC(todolistId))
    }, [dispatch, todolistId]);

    const tasks: TaskType[] = useSelector<AppRootStateType, TaskType[]>(state => (state.tasks[todolistId] || []))

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const filterTasks = (filter: FilterValuesType, tasks: TaskType[]) => {
        if (filter === 'active') {
            return tasks.filter(task => !task.status)
        }
        if (filter === 'completed') {
            return tasks.filter(task => task.status)
        }
        return tasks
    }

    const filteredTasks = filterTasks(filter, tasks)

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }

    const changeTodoListTitleHandler = (title: string) => {
        dispatch(changeTodoListTC(todolistId, title))
    }

    const task = tasks.length === 0
        ? <p>Task list is empty</p>
        : <ul>
            {filteredTasks.map((task: TaskType) => <Task key={task.id} todoListId={todolistId} task={task}/>)}
        </ul>

    const removeTodoListHandler = () => {
        dispatch(removeTodoListTC(todolistId))
    }

    return (
        <div style={{border: "solid 1px blue", borderRadius: '10px', padding: '20px'}}>
            <div>
                <EditableSpan oldTitle={todoList.title} changeTitleHandler={changeTodoListTitleHandler}/>
                <IconButton onClick={removeTodoListHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {task}
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
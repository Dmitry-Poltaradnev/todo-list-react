import {memo, useEffect, useState} from "react";
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
import {taskApi} from "./api/task-api";
import {todoListApi} from "./api/todolist-api";

type PropsType = {
    todoList: TodolistType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export const Todolist = memo(({todoList}: PropsType) => {


    const dispatch = useDispatch();

    const todoListId = todoList.id

    // useEffect(() => {
    //     taskApi.getTasks(todoListId).then(res => {
    //         console.log(res.data.items)
    //     })
    // }, []);

    // useEffect(() => {
    //     const title = 'New Task'
    //     taskApi.addTask(todoListId, title).then(res => {
    //         console.log(res.data.items)
    //     })
    // }, []);

    // useEffect(() => {
    //     taskApi.removeTask(todoListId).then(res => {
    //         console.log(res.data.items)
    //     })
    // }, []);

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

    // const task = tasks.length === 0
    //     ? <p>Task list is empty</p>
    //     : <ul>
    //         {filteredTasks.map((task: TaskType) => <Task key={task.id} todoListId={todoListId} task={task}/>)}
    //     </ul>

    const removeTodoListHandler = () => {
        dispatch(removeTodoListAC(todoListId))
        todoListApi.removeTodoList(todoListId)
    }

    return (
        <div style={{border: "solid 1px blue", borderRadius: '10px', padding: '20px'}}>
            <div>
                <EditableSpan oldTitle={todoList.title} changeTitleHandler={changeTodoListTitleHandler}/>
                <IconButton onClick={() => removeTodoListHandler()} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            {/*{task}*/}
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
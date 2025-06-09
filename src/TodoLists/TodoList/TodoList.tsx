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
import {changeTodoListTC, removeTodoListTC, TodoListDomainType} from "../../module/todoListReducer";
import {addTaskTC, setTasksTC, TaskType} from "../../module/taskReducer";
import {Task} from "./Tasks/Task";

type PropsType = {
    todoList: TodoListDomainType
}

enum FilterValues {
    All = 'all',
    Active = 'active',
    Completed = 'completed'
}

export const Todolist = memo(({todoList}: PropsType) => {

    const dispatch = useAppDispatch();

    const todolistId = todoList.id
    useEffect(() => {
        dispatch(setTasksTC(todolistId))
    }, [dispatch, todolistId]);

    const tasks: TaskType[] = useSelector<AppRootStateType, TaskType[]>(state => (state.tasks[todolistId] || []))

    const [filter, setFilter] = useState<FilterValues>(FilterValues.All)

    const filterTasks = (filter: FilterValues, tasks: TaskType[]) => {
        if (filter === FilterValues.Active) {
            return tasks.filter(task => !task.status)
        }
        if (filter === FilterValues.Completed) {
            return tasks.filter(task => task.status)
        }
        return tasks
    }

    const filteredTasks = filterTasks(filter, tasks)

    const changeFilter = (filter: FilterValues) => {
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
            {filteredTasks.map((task: TaskType) => <Task key={task.id} todoListId={todolistId} task={task} entityStatus={todoList.entityStatus}/>)}
        </ul>

    const removeTodoListHandler = () => {
        dispatch(removeTodoListTC(todolistId))
    }

    return (
        <li style={{border: "solid 1px blue", borderRadius: '10px', padding: '20px', listStyle: 'none'}}>
            <div>
                <EditableSpan entityStatus={todoList.entityStatus} oldTitle={todoList.title} changeTitleHandler={changeTodoListTitleHandler}/>
                <IconButton  disabled={todoList.entityStatus === 'loading'} onClick={removeTodoListHandler}
                            aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <AddItemForm entityTodoList={todoList.entityStatus} addItem={addTaskHandler}/>
            </div>
            {task}
            <Box sx={filterButtonsContainerSx}>
                <Button onClick={() => changeFilter(FilterValues.All)}
                        variant={filter === FilterValues.All ? "outlined" : "contained"}>All</Button>
                <Button onClick={() => changeFilter(FilterValues.Active)}
                        variant={filter === FilterValues.Active ? "outlined" : "contained"}>Active</Button>
                <Button onClick={() => changeFilter(FilterValues.Completed)}
                        variant={filter === FilterValues.Completed ? "outlined" : "contained"}>Completed</Button>
            </Box>
        </li>
    )
})
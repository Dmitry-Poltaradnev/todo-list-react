import React, {ChangeEvent, memo} from 'react';
import {changeTaskStatusAC, removeTaskAC, TaskType, updateTaskTitleAC} from "./module/taskReducer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {taskApi} from "./api/task-api";
import {useAppDispatch} from "./store";

type TaskProps = {
    task: TaskType
    todoListId: string
}

export const Task = memo(({todoListId, task}: TaskProps) => {

        const dispatch = useAppDispatch();

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(todoListId, task.id, newStatusValue))
        }
        const changeTaskTitleHandler = (newTitle: string) => {
            taskApi.changeTaskTitle(todoListId, task.id, newTitle).then(res => {
                dispatch(updateTaskTitleAC(todoListId, task.id, res.data.data.item.title))
            })
        }

        const removeTaskHandler = () => {
            taskApi.removeTask(todoListId, task.id)
            dispatch(removeTaskAC(todoListId, task.id))
        }

        return (
            <li style={{listStyle: 'none'}}>
                {/*<Checkbox checked={task.status} onChange={changeTaskStatusHandler}/>*/}
                <EditableSpan oldTitle={task.title} changeTitleHandler={changeTaskTitleHandler}/>
                <IconButton onClick={() => removeTaskHandler()} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </li>
        );
    }
)


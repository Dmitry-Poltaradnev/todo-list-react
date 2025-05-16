import React, {ChangeEvent, memo} from 'react';
import {changeTaskStatusAC, removeTaskAC, TaskType, updateTaskTitleAC} from "./module/taskReducer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";

type TaskProps = {
    task: TaskType
    todoListId: string
}

export const Task = memo(({todoListId, task}: TaskProps) => {

    const dispatch = useDispatch();

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todoListId, task.id, newStatusValue))
    }
    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(updateTaskTitleAC(todoListId, task.id, newTitle))
    }

    return (
        <li style={{listStyle: 'none'}}>
            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan oldTitle={task.title} changeTitleHandler={changeTaskTitleHandler}/>
            <IconButton onClick={() => dispatch(removeTaskAC(todoListId, task.id))} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    );
})


import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, removeTaskAC, TaskType} from "./module/taskReducer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import Checkbox from "@mui/material/Checkbox";

type TaskProps = {
    task: TaskType
    todoListId: string
}

export const Task = ({todoListId, task}: TaskProps) => {

    const dispatch = useDispatch();

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todoListId, task.id, newStatusValue))
    }

    return (
        <li style={{listStyle: 'none'}}>
            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <span>{task.title}</span>
            <IconButton onClick={() => dispatch(removeTaskAC(todoListId, task.id))} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};


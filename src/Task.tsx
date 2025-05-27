import React, {ChangeEvent, memo} from 'react';
import {
    changeTaskStatusTC,
    changeTaskTitleTC,
    removeTaskTC,
    TaskType,
} from "./module/taskReducer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "./EditableSpan";
import {useAppDispatch} from "./store";
import {Checkbox} from "@mui/material";

type TaskProps = {
    task: TaskType
    todoListId: string
}

export const Task = memo(({todoListId, task}: TaskProps) => {

        const dispatch = useAppDispatch();

        const removeTaskHandler = () => {
            dispatch(removeTaskTC(todoListId, task.id))
        }

        const changeTaskTitleHandler = (newTitle: string) => {
            dispatch(changeTaskTitleTC(todoListId, task.id, newTitle))
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatus = e.target.checked ? 2 : 0
            dispatch(changeTaskStatusTC(todoListId, task.id, newStatus))
        }


        return (
            <li style={{listStyle: 'none'}}>
                <Checkbox checked={task.status === 2} onChange={changeTaskStatusHandler}/>
                <EditableSpan oldTitle={task.title} changeTitleHandler={changeTaskTitleHandler}/>
                <IconButton onClick={removeTaskHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </li>
        );
    }
)


import React, {ChangeEvent, memo} from 'react';
import {
    removeTaskTC,
    TaskType,
    updateTaskTC
} from "../../../module/taskReducer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {useAppDispatch} from "../../../store";
import {Checkbox} from "@mui/material";
import {RequestStatusType} from "../../../module/app-slice";

type TaskProps = {
    task: TaskType
    todoListId: string
    entityStatus: RequestStatusType
}

export const Task = memo(({todoListId, task, entityStatus}: TaskProps) => {

        const dispatch = useAppDispatch();

        const removeTaskHandler = () => {
            dispatch(removeTaskTC(todoListId, task.id))
        }

        const changeTaskTitleHandler = (newTitle: string) => {
            dispatch(updateTaskTC(todoListId, task.id, {title: newTitle}))
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatus = e.target.checked ? 2 : 0
            dispatch(updateTaskTC(todoListId, task.id, {status: newStatus}))
        }

        return (
            <li style={{listStyle: 'none'}}>
                <Checkbox disabled={entityStatus === 'loading'} checked={task.status === 2}
                          onChange={changeTaskStatusHandler}/>
                <EditableSpan entityStatus={entityStatus} oldTitle={task.title}
                              changeTitleHandler={changeTaskTitleHandler}/>
                <IconButton disabled={entityStatus === 'loading'} onClick={removeTaskHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </li>
        );
    }
)


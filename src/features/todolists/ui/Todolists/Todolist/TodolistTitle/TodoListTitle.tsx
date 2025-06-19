import React from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodoListTC, removeTodoListTC, TodoListDomainType} from "../../../../model/todoList-slice";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type TodoListTitlePropsType = {
    todoList: TodoListDomainType
}

export const TodoListTitle = ({todoList}: TodoListTitlePropsType) => {

    const {id, title} = todoList

    const dispatch = useAppDispatch();

    const changeTodoListTitleHandler = (title: string) => {
        dispatch(changeTodoListTC(id, title))
    }

    const removeTodoListHandler = () => {
        dispatch(removeTodoListTC(id))
    }

    return (
        <div>
            <EditableSpan entityStatus={todoList.entityStatus} oldTitle={title}
                          changeTitleHandler={changeTodoListTitleHandler}/>
            <IconButton disabled={todoList.entityStatus === 'loading'} onClick={removeTodoListHandler}
                        aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};


import React from 'react';
import {Todolist} from "./TodoList/TodoList";
import {addTodoListTC} from "../model/todoList-slice";
import {SkeletonTodoList} from "../components/SkeletonTodoList/SkeletonTodoList";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {selectAppStatus} from "../model/app-slice";
import {useAppSelector} from "../hooks/useAppSelector";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {selectTodoLists} from "../model/todolists-selectors";

export const TodoLists = () => {

    const dispatch = useAppDispatch();

    const todoLists = useAppSelector(selectTodoLists)

    const appStatus = useAppSelector(selectAppStatus)

    const skeletonCount = todoLists.length > 0 ? todoLists.length : 3

    const addTodListHandler = (title: string) => {
        dispatch(addTodoListTC(title))
    }

    return (
        <div>
            <Grid sx={{m: '40px 0px'}} container>
                <AddItemForm addItem={addTodListHandler}/>
            </Grid>
            <div>
                {appStatus === 'loading' ?
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'column'
                    }}> {Array.from({length: skeletonCount}).map((_, i) => <SkeletonTodoList key={i}/>)}
                    </div> : todoLists.map(todoList => <Todolist key={todoList.id} todoList={todoList}/>)
                }
            </div>

        </div>

    )
};


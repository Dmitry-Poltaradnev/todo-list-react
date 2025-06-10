import React from 'react';
import {Todolist} from "./TodoList/TodoList";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store";
import {addTodoListTC, TodoListDomainType, TodoListType} from "../module/todoListReducer";
import {RequestStatusType} from "../module/appRedeucer";
import {SkeletonTodoList} from "../components/SkeletonTodoList/SkeletonTodoList";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";

export const TodoLists = () => {

    const dispatch = useAppDispatch();

    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todolists)

    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.appStatus)

    const todoListsCount = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)

    const skeletonCount = todoListsCount.length > 0 ? todoListsCount.length : 3

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


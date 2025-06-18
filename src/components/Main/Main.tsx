import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {addTodoListTC, getTodosTC} from "../../model/todoList-slice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {TodoLists} from "../../TodoLists/TodoLists";
import {AddItemForm} from "../AddItemForm/AddItemForm";

export const Main = () => {
    // Мы используем вместо dispatch новый кастомный useAppDispatch из store чтобы каждый раз не типизировать
    // genericami каждый dispatch
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodosTC())
    }, [dispatch]);


    const addTodListHandler = (title: string) => {
        dispatch(addTodoListTC(title))
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <AddItemForm addItem={addTodListHandler}/>
            </Grid>
            <Grid item>
                <TodoLists/>
            </Grid>
        </Grid>
    );
};


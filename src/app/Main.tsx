import React, { useEffect } from "react"
import Grid from "@mui/material/Grid"
import { addTodoListTC, getTodosTC } from "../features/todolists/model/todoList-slice"
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { TodoLists } from "../features/todolists/ui/Todolists/TodoLists"
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"

export const Main = () => {
  // Мы используем вместо dispatch новый кастомный useAppDispatch из store чтобы каждый раз не типизировать
  // genericami каждый dispatch
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodosTC())
  }, [dispatch])

  const addTodListHandler = (title: string) => {
    dispatch(addTodoListTC(title))
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <AddItemForm addItem={addTodListHandler} />
      </Grid>
      <Grid item>
        <TodoLists />
      </Grid>
    </Grid>
  )
}

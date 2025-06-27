import { createSelector } from "@reduxjs/toolkit"
import { TaskType } from "../api/tasksApi.types"
import { selectTasks } from "./task-slice"

export const selectTasksByTodolistId = (todolistId: string) =>
  createSelector([selectTasks], (tasks): TaskType[] => tasks[todolistId] || [])

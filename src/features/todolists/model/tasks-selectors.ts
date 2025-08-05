import { createSelector } from "@reduxjs/toolkit"
import { DomainTask } from "../api/tasksApi.types"
import { selectTasks } from "./task-slice"

export const selectTasksByTodolistId = (todolistId: string) =>
  createSelector([selectTasks], (tasks): DomainTask[] => tasks[todolistId] || [])

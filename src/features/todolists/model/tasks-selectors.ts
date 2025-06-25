import { createSelector } from "@reduxjs/toolkit"
import { AppRootStateType } from "../../../app/store"
import { TaskType } from "../api/tasksApi.types"

export const selectTasksState = (state: AppRootStateType) => state.tasks

export const selectTasksByTodolistId = (todolistId: string) =>
  createSelector([selectTasksState], (tasks): TaskType[] => tasks[todolistId] || [])

import React, { ChangeEvent, memo } from "react"
import { removeTaskTC, updateTaskTC } from "../../../../../model/task-slice"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import { Checkbox } from "@mui/material"
import { RequestStatusType } from "../../../../../model/app-slice"
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch"
import { TaskStatus, TaskType } from "../../../../../api/tasksApi.types"

type TaskPropsType = {
  task: TaskType
  todoListId: string
  entityStatus: RequestStatusType
}

export const Task = memo(({ todoListId, task, entityStatus }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ todolistId: todoListId, taskId: task.id }))
  }

  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(updateTaskTC({ todolistId: todoListId, taskId: task.id, domainModel: { title: newTitle } }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked ? TaskStatus.Complete : TaskStatus.New
    dispatch(updateTaskTC({ todolistId: todoListId, taskId: task.id, domainModel: { status: newStatus } }))
  }

  return (
    <>
      <Checkbox disabled={entityStatus === "loading"} checked={task.status === 2} onChange={changeTaskStatusHandler} />
      <EditableSpan entityStatus={entityStatus} oldTitle={task.title} changeTitleHandler={changeTaskTitleHandler} />
      <IconButton disabled={entityStatus === "loading"} onClick={removeTaskHandler} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </>
  )
})

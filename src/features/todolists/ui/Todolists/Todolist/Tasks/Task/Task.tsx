import React, { ChangeEvent, memo } from "react"
import { removeTaskTC, updateTaskTC } from "../../../../../model/task-slice"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { EditableSpan } from "../../../../../../../common/components/EditableSpan/EditableSpan"
import { Checkbox } from "@mui/material"
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch"
import { TaskStatus, DomainTask } from "../../../../../api/tasksApi.types"
import { RequestStatus } from "../../../../../model/app-slice"

type TaskPropsType = {
  task: DomainTask
  todoListId: string
  entityStatus: RequestStatus
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
      <Checkbox
        disabled={entityStatus === RequestStatus.Loading}
        checked={task.status === TaskStatus.Complete}
        onChange={changeTaskStatusHandler}
      />
      <EditableSpan entityStatus={entityStatus} oldTitle={task.title} changeTitleHandler={changeTaskTitleHandler} />
      <IconButton disabled={entityStatus === RequestStatus.Loading} onClick={removeTaskHandler} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </>
  )
})

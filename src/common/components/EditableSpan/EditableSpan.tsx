import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { RequestStatus } from "../../../features/todolists/model/app-slice"
import { TaskStatus } from "../../../features/todolists/api/tasksApi.types"
import s from "../../../features/todolists/ui/Todolists/Todolist/Tasks/Tasks.module.css"

type EditableSpanPropsType = {
  changeTitleHandler: (newTitle: string) => void
  oldTitle: string
  entityStatus: RequestStatus
  taskStatus?: TaskStatus
}

export const EditableSpan = ({ oldTitle, changeTitleHandler, entityStatus, taskStatus }: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const [newTitle, setNewTitle] = useState<string>(oldTitle)

  const switchStateMode = () => {
    if (entityStatus !== "loading") {
      setEditMode(!editMode)
      if (newTitle.trim().length !== 0 && editMode) {
        changeTitleHandler(newTitle.trim())
      }
    }
  }

  const changeOldTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField
      onChange={changeOldTask}
      autoFocus
      onBlur={switchStateMode}
      value={newTitle}
      id="outlined-basic"
      size="small"
      label="Change title"
      variant="outlined"
    />
  ) : (
    <span className={taskStatus === TaskStatus.Complete ? s.finishedTask : undefined} onDoubleClick={switchStateMode}>
      {oldTitle}
    </span>
  )
}

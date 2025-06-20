import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  entityTodoList?: string
}

export const AddItemForm = ({ entityTodoList, addItem }: AddItemFormPropsType) => {
  const [taskTitle, setTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim())
      setTaskTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        error={!!error}
        value={taskTitle}
        onKeyUp={addTaskOnKeyUpHandler}
        onChange={changeItemTitleHandler}
        id="outlined-basic"
        label="Enter a title"
        size="small"
        variant="outlined"
        helperText={error}
      />
      <IconButton disabled={entityTodoList === "loading"} onClick={addItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}

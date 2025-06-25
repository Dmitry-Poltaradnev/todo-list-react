import { filterButtonsContainerSx } from "./Tasks.styles"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import React, { useState } from "react"
import { Task } from "./Task/Task"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { selectTasksByTodolistId } from "../../../../model/tasks-selectors"
import { selectEntityStatusById } from "../../../../model/todolists-selectors"
import { TaskType } from "../../../../api/tasksApi.types"

type TasksPropsType = {
  todolistId: string
}

enum FilterValues {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export const Tasks = ({ todolistId }: TasksPropsType) => {
  const tasks = useAppSelector(selectTasksByTodolistId(todolistId))

  const todoListEntityStatus = useAppSelector(selectEntityStatusById(todolistId))

  const [filter, setFilter] = useState<FilterValues>(FilterValues.All)

  const filterTasks = (filter: FilterValues, tasks: TaskType[]) => {
    if (filter === FilterValues.Active) {
      return tasks.filter((task) => !task.status)
    }
    if (filter === FilterValues.Completed) {
      return tasks.filter((task) => task.status)
    }
    return tasks
  }

  const filteredTasks = filterTasks(filter, tasks)

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  return (
    <div>
      <ul>
        {tasks.length ? (
          filteredTasks.map((task) => (
            <Task key={task.id} todoListId={todolistId} task={task} entityStatus={todoListEntityStatus} />
          ))
        ) : (
          <p>Task list is empty</p>
        )}
      </ul>
      <Box sx={filterButtonsContainerSx}>
        <Button
          onClick={() => changeFilter(FilterValues.All)}
          variant={filter === FilterValues.All ? "outlined" : "contained"}
        >
          All
        </Button>
        <Button
          onClick={() => changeFilter(FilterValues.Active)}
          variant={filter === FilterValues.Active ? "outlined" : "contained"}
        >
          Active
        </Button>
        <Button
          onClick={() => changeFilter(FilterValues.Completed)}
          variant={filter === FilterValues.Completed ? "outlined" : "contained"}
        >
          Completed
        </Button>
      </Box>
    </div>
  )
}

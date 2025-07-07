import { createAppSlice } from "../../../common/utils/createAppSlice"
import { changeStatusAppAC, ResultCode } from "./app-slice"
import { taskApi } from "../api/task-api"
import { handleServerAppError } from "../../../common/utils/utils"
import { TaskType, UpdateTaskModelType } from "../api/tasksApi.types"
import { RequestStatus } from "../../../common/types/types"
import { changeTodoListEntityStatusAC } from "./todoList-slice"
import { AppRootStateType } from "../../../common/types/types" // путь к types.ts

export type UpdateTaskArgType = {
  todolistId: string
  taskId: string
  domainModel: Partial<UpdateTaskModelType>
}

type InitialTasksStateType = {
  [key: string]: TaskType[]
}

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as InitialTasksStateType,
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk<
      { tasks: TaskType[]; todolistId: string },
      { todolistId: string },
      { rejectValue: string }
    >(
      async ({ todolistId }, { rejectWithValue }) => {
        try {
          const res = await taskApi.getTasks(todolistId)
          return { todolistId, tasks: res.data.items }
        } catch (err) {
          return rejectWithValue((err as Error).message || "Unknown error")
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),

    addTaskTC: create.asyncThunk<
      { task: TaskType; todolistId: string },
      { todolistId: string; title: string },
      { rejectValue: string }
    >(
      async ({ todolistId, title }, { dispatch, rejectWithValue }) => {
        dispatch(changeStatusAppAC(RequestStatus.Loading))
        try {
          const res = await taskApi.addTask({ todolistId, title })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAppAC(RequestStatus.Success))
            return { task: res.data.data.item, todolistId }
          } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(res.data.messages[0] || "Failed to add task")
          }
        } catch (err) {
          return rejectWithValue((err as Error).message || "Unknown error")
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId].unshift(action.payload.task)
        },
      },
    ),

    removeTaskTC: create.asyncThunk<
      { todolistId: string; taskId: string },
      { todolistId: string; taskId: string },
      { rejectValue: string }
    >(
      async ({ todolistId, taskId }, { dispatch, rejectWithValue }) => {
        dispatch(changeStatusAppAC(RequestStatus.Loading))
        try {
          const res = await taskApi.removeTask({ todolistId, taskId })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAppAC(RequestStatus.Success))
            return { todolistId, taskId }
          } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(res.data.messages[0] || "Failed to remove task")
          }
        } catch (err) {
          return rejectWithValue((err as Error).message || "Unknown error")
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((t) => t.id === action.payload.taskId)
          if (index !== -1) tasks.splice(index, 1)
        },
      },
    ),

    updateTaskTC: create.asyncThunk<
      { taskId: string; todolistId: string; task: TaskType },
      UpdateTaskArgType,
      { rejectValue: string } // Указан правильный тип состояния
    >(
      async ({ todolistId, taskId, domainModel }, { getState, dispatch, rejectWithValue }) => {
        const state = getState() as AppRootStateType
        const task = state.tasks[todolistId]?.find((t: any) => t.id === taskId)
        if (!task) return rejectWithValue("Task not found")

        const apiModel: UpdateTaskModelType = {
          title: task.title,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: task.status,
          ...domainModel,
        }

        dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: "loading" }))
        try {
          const res = await taskApi.updateTask({ todolistId, taskId, model: apiModel })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAppAC(RequestStatus.Success))
            dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: "idle" }))
            return { taskId, todolistId, task: res.data.data.item }
          } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(res.data.messages[0] || "Update failed")
          }
        } catch (err) {
          dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: "idle" }))
          return rejectWithValue((err as Error).message || "Unknown error")
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((t) => t.id === action.payload.taskId)
          if (index !== -1) tasks[index] = action.payload.task
        },
      },
    ),
  }),
})

export const selectTasks = (state: { tasks: InitialTasksStateType }) => state.tasks

export const tasksReducer = tasksSlice.reducer
export const { fetchTasksTC, addTaskTC, removeTaskTC, updateTaskTC } = tasksSlice.actions

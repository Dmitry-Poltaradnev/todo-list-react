import { createAppSlice } from "../../../common/utils/createAppSlice"
import { RequestStatus, ResultCode } from "./app-slice"
import { taskApi } from "../api/task-api"
import { handleNetworkError, handleServerError } from "../../../common/utils/utils"
import { TaskType, UpdateTaskModelType } from "../api/tasksApi.types"
import { addTodoListTC, changeTodoListEntityStatusAC, removeTodoListTC } from "./todoList-slice"
import { AppRootStateType } from "../../../common/types/types"

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
      { tasks: TaskType[]; todolistId: string }, // Для работы со стэйтом, принимаем из response
      { todolistId: string }, // Для запроса на API  , принимаем из компоненты
      { rejectValue: string }
    >(
      async ({ todolistId }, { dispatch, rejectWithValue }) => {
        try {
          const res = await taskApi.getTasks(todolistId)
          return { todolistId, tasks: res.data.items }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
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
        try {
          const res = await taskApi.addTask({ todolistId, title })
          if (res.data.resultCode === ResultCode.Success) {
            return { task: res.data.data.item, todolistId }
          } else {
            handleServerError(dispatch, res.data)
            return rejectWithValue(res.data.messages[0] || "Failed to add task")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message || "Unknown error")
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId, task } = action.payload
          state[todolistId]?.unshift(task)
        },
      },
    ),
    removeTaskTC: create.asyncThunk<
      { todolistId: string; taskId: string },
      { todolistId: string; taskId: string },
      { rejectValue: string }
    >(
      async ({ todolistId, taskId }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: RequestStatus.Loading }))
          const res = await taskApi.removeTask({ todolistId, taskId })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: RequestStatus.Succeeded }))
            return { todolistId, taskId }
          } else {
            return rejectWithValue(res.data.messages[0] || "Failed to remove task")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message || "Unknown error")
        } finally {
          dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: RequestStatus.Idle }))
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
    updateTaskTC: create.asyncThunk<{ task: TaskType }, UpdateTaskArgType, { rejectValue: string }>(
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

        try {
          dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: RequestStatus.Loading }))
          const res = await taskApi.updateTask({ todolistId, taskId, model: apiModel })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: RequestStatus.Succeeded }))
            return { task: res.data.data.item }
          } else {
            handleServerError(dispatch, res.data)
            return rejectWithValue(res.data.messages[0] || "Update failed")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message || "Unknown error")
        } finally {
          dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: RequestStatus.Idle }))
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.task.todoListId]
          const index = tasks.findIndex((t) => t.id === action.payload.task.id)
          if (index !== -1) tasks[index] = action.payload.task
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      state[action.payload.id] = []
    })
    builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })
  },
})

export const selectTasks = (state: { tasks: InitialTasksStateType }) => state.tasks

export const tasksReducer = tasksSlice.reducer
export const { fetchTasksTC, addTaskTC, removeTaskTC, updateTaskTC } = tasksSlice.actions

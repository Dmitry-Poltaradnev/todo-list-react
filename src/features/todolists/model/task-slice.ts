import { changeTodoListEntityStatusAC } from "./todoList-slice"
import { taskApi } from "../api/task-api"
import { changeStatusAppAC, ResultCode } from "./app-slice"
import { handleServerAppError } from "../../../common/utils/utils"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TaskType, UpdateTaskModelType } from "../api/tasksApi.types"
import { RequestStatus } from "../../../common/types/types"
import { AppRootStateType } from "../../../app/store"

// const initialTasksState = {
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ],
// }

// ReturnType мы используем при работе с ф-циями и он типизирует возвращаемый результат
// type RemoveTaskTypeAC = ReturnType<typeof removeTaskAC>
// type AddTaskTypeAC = ReturnType<typeof addTaskAC>
// type ChangeTaskStatusTypeAC = ReturnType<typeof changeTaskStatusAC>
// type UpdateTaskTitleTypeAC = ReturnType<typeof updateTaskTitleAC>
// type AddTodoListActionType = ReturnType<typeof addTodoListAC>
// type SetTasksType = ReturnType<typeof setTasksAC>
// type RemoveTodoList = ReturnType<typeof removeTodoListAC>
//
// type TaskReducerType =
//     RemoveTaskTypeAC
//     | AddTaskTypeAC
//     | ChangeTaskStatusTypeAC
//     | UpdateTaskTitleTypeAC
//     | AddTodoListActionType
//     | SetTasksType
//     | RemoveTodoList
//
//
// export const taskReducer = (state: InitialTasksStateType = initialTasksState, action: TaskReducerType): InitialTasksStateType => {
//     switch (action.type) {
//         case 'SET-TASKS' : {
//             const {todolistId, tasks} = action.payload
//             return {...state, [todolistId]: [...tasks]}
//         }
//         case 'ADD-TODOLIST': {
//             const {id} = action.payload
//             return {
//                 ...state,
//                 [id]: []
//             };
//         }
//         case 'REMOVE-TODOLIST': {
//             const {id} = action.payload
//             const newState = {...state}
//             delete newState[id]
//             return newState
//         }
//         case 'REMOVE-TASK': {
//             const {todolistId, taskId} = action.payload
//             return {...state, [todolistId]: state[todolistId].filter(el => el.id !== taskId)}
//         }
//         case 'ADD-TASK': {
//             const {task} = action.payload
//             return {...state, [task.todoListId]: [task, ...state[task.todoListId]]}
//         }
//         case 'UPDATE-TASK-TITLE': {
//             const {todolistId, taskId, title} = action.payload
//             return {
//                 ...state, [todolistId]: state[todolistId].map(el => el.id === taskId ? {...el, title} : el)
//             }
//         }
//         case 'CHANGE-TASK-STATUS': {
//             const {todolistId, taskId, newStatus} = action.payload
//             return {
//                 ...state,
//                 [todolistId]: state[todolistId].map(el => el.id === taskId ? {...el, status: newStatus} : el)
//             }
//         }
//         default:
//             return state;
//     }
// };
//
// // ===============ActionsCreator
// export const setTasksAC = (todolistId: string, tasks: any) => {
//     return {type: 'SET-TASKS', payload: {todolistId, tasks}} as const
// }
//
// export const addTaskAC = (task: TaskType) => {
//     return {type: 'ADD-TASK', payload: {task}} as const
// }
//
// export const removeTaskAC = (todolistId: string, taskId: string) => {
//     return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
// }
//
// export const changeTaskStatusAC = (todolistId: string, taskId: string, newStatus: number) => {
//     return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, newStatus}} as const
// }
//
// export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
//     return {type: 'UPDATE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
// }

export type UpdateTaskArgType = {
  todolistId: string
  taskId: string
  domainModel: Partial<UpdateTaskModelType>
}

type InitialTasksStateType = {
  [key: string]: TaskType[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as InitialTasksStateType,
  reducers: (create) => ({
    setTasksAC: create.reducer<{ todolistId: string; tasks: TaskType[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    addTaskAC: create.reducer<TaskType>((state, action) => {
      const task = action.payload
      if (state[task.todoListId]) {
        state[task.todoListId].unshift(task)
      } else {
        state[task.todoListId] = [task]
      }
    }),
    removeTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const { todolistId, taskId } = action.payload
      if (state[todolistId]) {
        state[todolistId] = state[todolistId].filter((item) => item.id !== taskId)
      }
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; newStatus: number }>((state, action) => {
      const { todolistId, taskId, newStatus } = action.payload
      const tasks = state[todolistId]
      if (!tasks) return
      state[todolistId] = tasks.map((item) =>
        item.id === taskId
          ? {
              ...item,
              status: newStatus,
            }
          : item,
      )
    }),
    updateTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const { todolistId, taskId, title } = action.payload
      const tasks = state[todolistId]
      if (tasks) {
        const task = tasks.find((item: TaskType) => item.id === taskId)
        if (!task) return
        task.title = title
      }
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    })
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.todolistId].unshift(action.payload.task)
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const taskIndex = state[action.payload.todolistId].findIndex((item) => item.id === action.payload.taskId)
      if (taskIndex !== -1) state[action.payload.todolistId].splice(taskIndex, 1)
    })
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const { task, taskId, todolistId } = action.payload
      const index = state[todolistId].findIndex((item) => item.id === taskId)
      if (index !== -1) state[todolistId][index] = task
    })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export const fetchTasksTC = createAsyncThunk<
  { tasks: TaskType[]; todolistId: string },
  { todolistId: string },
  { rejectValue: string }
>(`${tasksSlice.name}/fetchTasksTC`, async ({ todolistId }, { rejectWithValue }) => {
  try {
    const res = await taskApi.getTasks(todolistId)
    return { todolistId, tasks: res.data.items }
  } catch (err) {
    return rejectWithValue((err as Error).message || "Unknown error")
  }
})

export const addTaskTC = createAsyncThunk<
  { task: TaskType; todolistId: string },
  {
    todolistId: string
    title: string
  },
  { rejectValue: string }
>(`${tasksSlice.name}/addTaskTC`, async ({ todolistId, title }, { dispatch, rejectWithValue }) => {
  dispatch(changeStatusAppAC(RequestStatus.Loading))
  try {
    const res = await taskApi.addTask({ todolistId, title })
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(changeStatusAppAC(RequestStatus.Success))
      return { task: res.data.data.item, todolistId }
    } else {
      handleServerAppError(dispatch, res.data)
      return rejectWithValue(res.data.messages[0] || "Failed to add todo list")
    }
  } catch (err) {
    return rejectWithValue((err as Error).message || "Unknown error")
  }
})

export const removeTaskTC = createAsyncThunk<
  { todolistId: string; taskId: string },
  {
    todolistId: string
    taskId: string
  },
  { rejectValue: string }
>(`${tasksSlice.name}/removeTaskTC`, async ({ todolistId, taskId }, { dispatch, rejectWithValue }) => {
  dispatch(changeStatusAppAC(RequestStatus.Loading))
  try {
    const res = await taskApi.removeTask({ todolistId, taskId })
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(changeStatusAppAC(RequestStatus.Success))
      return { todolistId, taskId }
    } else {
      handleServerAppError(dispatch, res.data)
      return rejectWithValue(res.data.messages[0] || "Failed to add todo list")
    }
  } catch (err) {
    return rejectWithValue((err as Error).message || "Unknown error")
  }
})

export const updateTaskTC = createAsyncThunk<
  { taskId: string; todolistId: string; task: TaskType },
  UpdateTaskArgType,
  { state: AppRootStateType; rejectValue: string }
>(
  `${tasksSlice.name}/updateTaskTC`,
  async ({ todolistId, taskId, domainModel }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const task = state.tasks[todolistId]?.find((t) => t.id === taskId)

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
      return rejectWithValue((err as Error).message)
    }
  },
)

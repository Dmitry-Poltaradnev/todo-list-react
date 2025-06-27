import { addTodoListAC, changeTodoListEntityStatusAC, removeTodoListAC } from "./todoList-slice"
import { taskApi } from "../api/task-api"
import { changeStatusAppAC, ResultCode, setAppErrorAC } from "./app-slice"
import { handleAppError, handleServerAppError, handleServerNetworkError } from "../../../common/utils/utils"
import { createSlice } from "@reduxjs/toolkit"
import { TaskType, UpdateTaskModelType } from "../api/tasksApi.types"
import { RequestStatus } from "../../../common/types/types"

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
    builder
      .addCase(addTodoListAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(removeTodoListAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { setTasksAC, addTaskAC, removeTaskAC, changeTaskStatusAC, updateTaskTitleAC } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
// ==================Thunks
export const setTasksTC = (todolistId: string) => (dispatch: any) => {
  taskApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setTasksAC({ todolistId, tasks: res.data.items }))
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: any) => {
  dispatch(changeStatusAppAC(RequestStatus.Loading))
  taskApi
    .addTask({ todolistId, title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(changeStatusAppAC(RequestStatus.Success))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      handleServerNetworkError(dispatch, err)
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: any) => {
  dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: "loading" }))
  taskApi
    .removeTask({ todolistId, taskId })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTaskAC({ todolistId, taskId }))
        dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: "idle" }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      handleAppError(dispatch, todolistId, err)
    })
}

export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>) => (dispatch: any, getState: any) => {
    // Сделал унифицированную Thunk для обновления task т.к и при обновлении статуса и при обновлении title перезаписывется вся task на бэк
    // поэтому с помощью Partial мы получаем из Thunk определенные поля для определённого типизированного объекта, после этого
    // создаем новый объект task и put его на бэк
    const state = getState()
    const task: TaskType = state.tasks[todolistId].find((el: TaskType) => el.id === taskId)

    if (!task) return

    const model: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate ?? null,
      deadline: task.deadline ?? null,
      status: task.status,
      ...domainModel,
    }
    dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: "loading" }))
    taskApi
      .updateTask({ todolistId, taskId, model })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          if (domainModel.status !== undefined) {
            dispatch(changeTaskStatusAC({ todolistId, taskId, newStatus: domainModel.status }))
          }
          if (domainModel.title !== undefined) {
            dispatch(updateTaskTitleAC({ todolistId, taskId, title: domainModel.title }))
          }
        }
        dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: "idle" }))
      })
      .catch((err) => {
        dispatch(setAppErrorAC(err.message))
        dispatch(changeTodoListEntityStatusAC({ id: todolistId, entityStatus: "idle" }))
      })
  }

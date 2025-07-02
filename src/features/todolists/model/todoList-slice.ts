import { todoListApi } from "../api/todolist-api"
import { changeStatusAppAC, RequestStatusType, ResultCode, setAppErrorAC } from "./app-slice"
import { handleServerAppError } from "../../../common/utils/utils"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TodoListType } from "../api/todolistsApi.types"
import { RequestStatus } from "../../../common/types/types"
import { fetchTasksTC } from "./task-slice"

// type TodoListReducerType =
//     RemoveTodoListActionType
//     | UpdateTodoListTitleActionType
//     | AddTodoListActionType
//     | SetTodoListActionType
//     | changeTodoListEntityStatusType
//
// type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
// type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleAC>
// type AddTodoListActionType = ReturnType<typeof addTodoListAC>
// type SetTodoListActionType = ReturnType<typeof setTodoListsAC>
// type changeTodoListEntityStatusType = ReturnType<typeof changeTodoListEntityStatusAC>
//
//
// export const todoListSlice = (state: TodoListDomainType[] = initialState, action: TodoListReducerType): TodoListDomainType[] => {
//     switch (action.type) {
//         case 'SET-TODOLIST' : {
//             const {todoLists} = action.payload
//             return todoLists
//         }
//         case 'ADD-TODOLIST': {
//             const {id, title} = action.payload
//             return [{id: id, title, entityStatus: 'idle'}, ...state]
//         }
//         case 'REMOVE-TODOLIST': {
//             const {id} = action.payload
//             return state.filter(el => el.id !== id);
//         }
//         case 'UPDATE-TODOLIST-TITLE': {
//             const {id, title} = action.payload
//             return state.map(el => el.id === id ? {...el, title} : el);
//         }
//         case 'CHANGE-TODOLIST-ENTITY-STATUS' : {
//             const {id, entityStatus} = action.payload
//             return state.map(el => el.id === id ? {...el, entityStatus: entityStatus} : el)
//         }
//         default:
//             return state;
//     }
// };
//
// export const setTodoListsAC = (todoLists: TodoListDomainType[]) => {
//     return {type: 'SET-TODOLIST', payload: {todoLists}} as const
// }
// export const addTodoListAC = (id: string, title: string) => {
//     return {type: 'ADD-TODOLIST', payload: {id, title}} as const
// }
// export const removeTodoListAC = (id: string) => {
//     return {type: 'REMOVE-TODOLIST', payload: {id}} as const
// }
// export const updateTodoListTitleAC = (id: string, title: string) => {
//     return {type: 'UPDATE-TODOLIST-TITLE', payload: {id, title}} as const
// }
// export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
//     return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload: {id, entityStatus}} as const;
// }

export type TodoListDomainType = TodoListType & {
  entityStatus: RequestStatusType
}

export const todoListSlice = createSlice({
  name: "todolists",
  initialState: [] as TodoListDomainType[],
  reducers: (create) => ({
    changeTodoListEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatusType }>((state, action) => {
      const { id, entityStatus } = action.payload
      const todo = state.find((item) => item.id === id)
      if (todo) todo.entityStatus = entityStatus
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchTodoLists.fulfilled, (_state, action) => {
      return action.payload ?? []
    })
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      state.unshift({
        ...action.payload,
        entityStatus: "idle",
      })
    })
    builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    })
    builder.addCase(changeTodoListTC.fulfilled, (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.todolistId)
      if (index !== -1) state[index].title = action.payload.title
    })
  },
  selectors: {
    selectTodoLists: (state) => state,
  },
})

export const todoListReducer = todoListSlice.reducer
export const { selectTodoLists } = todoListSlice.selectors

export const { changeTodoListEntityStatusAC } = todoListSlice.actions

// ==================Thunks============
export const fetchTodoLists = createAsyncThunk<TodoListDomainType[], void, { rejectValue: string }>(
  `${todoListSlice.name}/fetchTodoLists`,
  async (_arg, { dispatch, rejectWithValue }) => {
    dispatch(changeStatusAppAC(RequestStatus.Loading))
    try {
      const res = await todoListApi.getTodoLists()
      const domainTodoLists: TodoListDomainType[] = res.data.map((todoList) => ({ ...todoList, entityStatus: "idle" }))
      domainTodoLists.forEach((item) => dispatch(fetchTasksTC({ todolistId: item.id })))
      dispatch(changeStatusAppAC(RequestStatus.Success))
      return domainTodoLists
    } catch (err) {
      return rejectWithValue((err as Error).message || "Unknown error")
    }
  },
)

export const addTodoListTC = createAsyncThunk<TodoListType, { title: string }, { rejectValue: string }>(
  `${todoListSlice.name}/addTodoListTC`,
  async ({ title }, { dispatch, rejectWithValue }) => {
    dispatch(changeStatusAppAC(RequestStatus.Loading))
    try {
      const res = await todoListApi.addTodoList(title)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeStatusAppAC(RequestStatus.Success))
        return res.data.data.item
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(res.data.messages[0] || "Failed to add todo list")
      }
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const removeTodoListTC = createAsyncThunk<{ id: string }, { id: string }, { rejectValue: string }>(
  `${todoListSlice.name}/removeTodoListTC`,
  async ({ id }, { dispatch, rejectWithValue }) => {
    dispatch(changeTodoListEntityStatusAC({ id, entityStatus: "loading" }))
    try {
      const res = await todoListApi.removeTodoList(id)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeTodoListEntityStatusAC({ id, entityStatus: "succeeded" }))
        return { id }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(res.data.messages[0] || "Failed to add todo list")
      }
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const changeTodoListTC = createAsyncThunk<
  { todolistId: string; title: string },
  { todolistId: string; title: string },
  { rejectValue: string }
>(`${todoListSlice.name}/changeTodoListTC`, async ({ todolistId, title }, { dispatch, rejectWithValue }) => {
  try {
    const res = await todoListApi.updateTodoList({ todolistId, title })
    if (res.data.resultCode === ResultCode.Success) {
      return { todolistId, title }
    } else {
      dispatch(setAppErrorAC(res.data.messages[0] || "Unknown error occurred"))
      return rejectWithValue(res.data.messages[0] || "Unknown error occurred")
    }
  } catch (err) {
    return rejectWithValue((err as Error).message)
  }
})

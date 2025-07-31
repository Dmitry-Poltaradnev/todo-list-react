import { todoListApi } from "../api/todolist-api"
import { changeStatusAppAC, RequestStatus, ResultCode, setAppErrorAC } from "./app-slice"
import { handleAppError, handleNetworkError } from "../../../common/utils/utils"
import { TodoListType } from "../api/todolistsApi.types"
import { fetchTasksTC } from "./task-slice"
import { createAppSlice } from "../../../common/utils/createAppSlice"

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
  entityStatus: RequestStatus
}

export const todoListSlice = createAppSlice({
  name: "todolists",
  initialState: [] as TodoListDomainType[],
  reducers: (create) => ({
    changeTodoListEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const { id, entityStatus } = action.payload
      const todo = state.find((item) => item.id === id)
      if (todo) todo.entityStatus = entityStatus
    }),
    fetchTodoListsTC: create.asyncThunk<TodoListDomainType[], void, { rejectValue: string }>(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAppAC(RequestStatus.Loading))
          const res = await todoListApi.getTodoLists()
          const domainTodoLists: TodoListDomainType[] = res.data.map((todoList) => ({
            ...todoList,
            entityStatus: RequestStatus.Idle,
          }))
          domainTodoLists.forEach((item) => dispatch(fetchTasksTC({ todolistId: item.id })))
          dispatch(changeStatusAppAC(RequestStatus.Succeeded))
          return domainTodoLists
        } catch (err) {
          dispatch(setAppErrorAC((err as Error).message))
          return rejectWithValue((err as Error).message || "Unknown error")
        } finally {
          dispatch(changeStatusAppAC(RequestStatus.Idle))
        }
      },
      {
        fulfilled: (_state, action) => action.payload ?? [],
      },
    ),
    addTodoListTC: create.asyncThunk<TodoListType, { title: string }, { rejectValue: string }>(
      async ({ title }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAppAC(RequestStatus.Loading))
          const res = await todoListApi.addTodoList(title)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAppAC(RequestStatus.Succeeded))
            return res.data.data.item
          } else {
            handleAppError(dispatch, res.data)
            return rejectWithValue(res.data.messages[0] || "Failed to add todo list")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message)
        } finally {
          dispatch(changeStatusAppAC(RequestStatus.Idle))
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({
            ...action.payload,
            entityStatus: RequestStatus.Idle,
          })
        },
      },
    ),
    removeTodoListTC: create.asyncThunk<{ id: string }, { id: string }, { rejectValue: string }>(
      async ({ id }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeTodoListEntityStatusAC({ id, entityStatus: RequestStatus.Loading }))
          const res = await todoListApi.removeTodoList(id)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeTodoListEntityStatusAC({ id, entityStatus: RequestStatus.Succeeded }))
            return { id }
          } else {
            return rejectWithValue(res.data.messages[0] || "Failed to remove todo list")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message)
        } finally {
          dispatch(changeTodoListEntityStatusAC({ id, entityStatus: RequestStatus.Idle }))
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((item) => item.id === action.payload.id)
          if (index !== -1) state.splice(index, 1)
        },
      },
    ),
    changeTodoListTC: create.asyncThunk<
      { todolistId: string; title: string },
      { todolistId: string; title: string },
      { rejectValue: string }
    >(
      async ({ todolistId, title }, { dispatch, rejectWithValue }) => {
        try {
          const res = await todoListApi.updateTodoList({ todolistId, title })
          if (res.data.resultCode === ResultCode.Success) {
            return { todolistId, title }
          } else {
            return rejectWithValue(res.data.messages[0] || "Unknown error occurred")
          }
        } catch (err) {
          handleNetworkError(dispatch, err as Error)
          return rejectWithValue((err as Error).message)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((item) => item.id === action.payload.todolistId)
          if (index !== -1) state[index].title = action.payload.title
        },
      },
    ),
  }),
  selectors: {
    selectTodoLists: (state) => state,
  },
})

export const todoListReducer = todoListSlice.reducer
export const { selectTodoLists } = todoListSlice.selectors

export const { changeTodoListEntityStatusAC, fetchTodoListsTC, addTodoListTC, removeTodoListTC, changeTodoListTC } =
  todoListSlice.actions

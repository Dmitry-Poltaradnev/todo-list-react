import { todoListApi } from "../api/todolist-api"
import { changeStatusAppAC, RequestStatusType, ResultCode, setAppErrorAC } from "./app-slice"
import { handleAppError, handleServerAppError, handleServerNetworkError } from "../../../common/utils/utils"
import { createSlice, current } from "@reduxjs/toolkit"
import { TodoListType } from "../api/todolistsApi.types"
import { setTasksTC } from "./task-slice"
import { RequestStatus } from "../../../common/types/types"

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
    setTodoListsAC: create.reducer<TodoListDomainType[]>((_state, action) => {
      return action.payload
    }),
    addTodoListAC: create.reducer<TodoListType>((state, action) => {
      state.unshift({
        id: action.payload.id,
        title: action.payload.title,
        order: action.payload.order,
        addedDate: action.payload.addedDate,
        entityStatus: "idle",
      })
    }),
    removeTodoListAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
      console.log(current(state))
    }),
    updateTodoListTitleAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const { todolistId, title } = action.payload
      const todo = state.find((item) => item.id === todolistId)
      if (todo) todo.title = title
    }),
    changeTodoListEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatusType }>((state, action) => {
      const { id, entityStatus } = action.payload
      const todo = state.find((item) => item.id === id)
      if (todo) todo.entityStatus = entityStatus
    }),
  }),
  selectors: {
    selectTodoLists: (state) => state,
  },
})

export const todoListReducer = todoListSlice.reducer
export const { selectTodoLists } = todoListSlice.selectors

export const { setTodoListsAC, addTodoListAC, removeTodoListAC, updateTodoListTitleAC, changeTodoListEntityStatusAC } =
  todoListSlice.actions

// ==================Thunks
export const getTodosTC = () => (dispatch: any) => {
  dispatch(changeStatusAppAC(RequestStatus.Loading))
  todoListApi
    .getTodoLists()
    .then((res) => {
      const domainTodoLists: TodoListDomainType[] = res.data.map((todoList) => ({ ...todoList, entityStatus: "idle" }))
      dispatch(setTodoListsAC(domainTodoLists))
      domainTodoLists.forEach((item) => dispatch(setTasksTC(item.id)))
      dispatch(changeStatusAppAC(RequestStatus.Success))
    })
    .catch((err) => {
      console.log(err.message)
    })
}
export const addTodoListTC = (title: string) => (dispatch: any) => {
  todoListApi
    .addTodoList(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        const { id, order, addedDate } = res.data.data.item
        dispatch(addTodoListAC({ id, title, order, addedDate }))
        dispatch(changeStatusAppAC(RequestStatus.Success))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((err) => {
      handleServerNetworkError(dispatch, err)
    })
}
export const removeTodoListTC = (id: string) => (dispatch: any) => {
  dispatch(changeTodoListEntityStatusAC({ id, entityStatus: "loading" }))
  todoListApi
    .removeTodoList(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTodoListAC({ id }))
        dispatch(changeTodoListEntityStatusAC({ id, entityStatus: "succeeded" }))
      }
    })
    .catch((err) => {
      handleAppError(dispatch, id, err)
    })
}
export const changeTodoListTC = (todolistId: string, title: string) => (dispatch: any) => {
  todoListApi
    .updateTodoList({ todolistId, title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTodoListTitleAC({ todolistId, title }))
      } else {
        dispatch(setAppErrorAC(res.data.messages[0] || "Unknown error occurred"))
      }
    })
    .catch((err) => {
      dispatch(setAppErrorAC(err.message))
    })
}

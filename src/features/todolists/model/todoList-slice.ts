import { todoListApi } from "../api/todolist-api"
import { changeStatusAppAC, RequestStatusType, ResultCode, setAppErrorAC } from "./app-slice"
import { handleAppError, handleServerAppError, handleServerNetworkError } from "../../../common/utils/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TodoListType } from "../api/todolistsApi.types"
import { setTasksTC } from "./task-slice"

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

const initialState: TodoListDomainType[] = []

export type TodoListDomainType = TodoListType & {
  entityStatus: RequestStatusType
}

export const todoListSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    setTodoListsAC(state, action: PayloadAction<TodoListDomainType[]>) {
      return action.payload
    },
    addTodoListAC(state, action: PayloadAction<TodoListType>) {
      state.unshift({
        id: action.payload.id,
        title: action.payload.title,
        order: action.payload.order,
        addedDate: action.payload.addedDate,
        entityStatus: "idle",
      })
    },
    removeTodoListAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    updateTodoListTitleAC(state, action: PayloadAction<{ todolistId: string; title: string }>) {
      const { todolistId, title } = action.payload
      const todo = state.find((item) => item.id === todolistId)
      if (todo) todo.title = title
    },
    changeTodoListEntityStatusAC(state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) {
      const { id, entityStatus } = action.payload
      const todo = state.find((item) => item.id === id)
      if (todo) todo.entityStatus = entityStatus
    },
  },
})

export const { setTodoListsAC, addTodoListAC, removeTodoListAC, updateTodoListTitleAC, changeTodoListEntityStatusAC } =
  todoListSlice.actions

export const todoListReducer = todoListSlice.reducer

// ==================Thunks
export const getTodosTC = () => (dispatch: any) => {
  dispatch(changeStatusAppAC("loading"))
  todoListApi
    .getTodoLists()
    .then((res) => {
      const domainTodoLists: TodoListDomainType[] = res.data.map((todoList) => ({ ...todoList, entityStatus: "idle" }))
      dispatch(setTodoListsAC(domainTodoLists))
      domainTodoLists.forEach((item) => dispatch(setTasksTC(item.id)))
      dispatch(changeStatusAppAC("succeeded"))
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
        dispatch(changeStatusAppAC("succeeded"))
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

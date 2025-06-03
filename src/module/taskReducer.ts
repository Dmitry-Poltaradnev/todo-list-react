import {addTodoListAC, changeTodoListEntityStatusAC, removeTodoListAC} from "./todoListReducer";
import {taskApi} from "../api/task-api";
import {changeStatusAppAC, ResultCode, setAppErrorAC} from "./appRedeucer";
import {handleAppError, handleServerAppError, handleServerNetworkError} from "../common/utils";

const initialTasksState = {}

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

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type InitialTasksStateType = {
    [key: string]: TaskType[]
}

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: null | string
    deadline: null | string
}

// ReturnType мы используем при работе с ф-циями и он типизирует возвращаемый результат
type RemoveTaskTypeAC = ReturnType<typeof removeTaskAC>
type AddTaskTypeAC = ReturnType<typeof addTaskAC>
type ChangeTaskStatusTypeAC = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskTitleTypeAC = ReturnType<typeof updateTaskTitleAC>
type AddTodoListActionType = ReturnType<typeof addTodoListAC>
type SetTasksType = ReturnType<typeof setTasksAC>
type RemoveTodoList = ReturnType<typeof removeTodoListAC>

type TaskReducerType =
    RemoveTaskTypeAC
    | AddTaskTypeAC
    | ChangeTaskStatusTypeAC
    | UpdateTaskTitleTypeAC
    | AddTodoListActionType
    | SetTasksType
    | RemoveTodoList


export const taskReducer = (state: InitialTasksStateType = initialTasksState, action: TaskReducerType): InitialTasksStateType => {
    switch (action.type) {
        case 'SET-TASKS' : {
            const {todolistId, tasks} = action.payload
            return {...state, [todolistId]: [...tasks]}
        }
        case 'ADD-TODOLIST': {
            const {id} = action.payload
            return {
                ...state,
                [id]: []
            };
        }
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload
            const newState = {...state}
            delete newState[id]
            return newState
        }
        case 'REMOVE-TASK': {
            const {todolistId, taskId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(el => el.id !== taskId)}
        }
        case 'ADD-TASK': {
            const {task} = action.payload
            return {...state, [task.todoListId]: [task, ...state[task.todoListId]]}
        }
        case 'UPDATE-TASK-TITLE': {
            const {todolistId, taskId, title} = action.payload
            return {
                ...state, [todolistId]: state[todolistId].map(el => el.id === taskId ? {...el, title} : el)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            const {todolistId, taskId, newStatus} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(el => el.id === taskId ? {...el, status: newStatus} : el)
            }
        }
        default:
            return state;
    }
};

// ===============ActionsCreator
export const setTasksAC = (todolistId: string, tasks: any) => {
    return {type: 'SET-TASKS', payload: {todolistId, tasks}} as const
}

export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', payload: {task}} as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, newStatus: number) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, newStatus}} as const
}

export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'UPDATE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}

// ==================Thunks
export const setTasksTC = (todolistId: string) => (dispatch: any, getState: any) => {
    taskApi.getTasks(todolistId).then(res => {
        dispatch(setTasksAC(todolistId, res.data.items))
    }).catch(err => {
        console.log(err.message)
    })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: any, getState: any) => {
    dispatch(changeStatusAppAC('loading'))
    taskApi.addTask(todoListId, title).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(changeStatusAppAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }).catch(err => {
        handleServerNetworkError(dispatch, err)
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: any, getState: any) => {
    dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
    taskApi.removeTask(todolistId, taskId).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(changeTodoListEntityStatusAC(todolistId, 'idle'))
        }
    }).catch(err => {
        handleAppError(dispatch, todolistId, err)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>) => (dispatch: any, getState: any) => {
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
        completed: task.completed,
        status: task.status,
        ...domainModel
    }
    dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
    taskApi.updateTaskStatus(todolistId, taskId, model).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            if (domainModel.status !== undefined) {
                dispatch(changeTaskStatusAC(todolistId, taskId, domainModel.status))
            }
            if (domainModel.title !== undefined) {
                dispatch(updateTaskTitleAC(todolistId, taskId, domainModel.title))
            }
        }
        dispatch(changeTodoListEntityStatusAC(todolistId, 'idle'))
    }).catch(err => {
        dispatch(setAppErrorAC(err.message))
        dispatch(changeTodoListEntityStatusAC(todolistId, 'idle'))
    })
}

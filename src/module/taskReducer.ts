import {addTodoListAC, removeTodoListAC} from "./todoListReducer";
import {taskApi} from "../api/task-api";

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

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
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
        case 'CHANGE-TASK-STATUS': {
            const {todolistId, taskId, taskStatus} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
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


export const changeTaskStatusAC = (todolistId: string, taskId: string, taskStatus: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, taskStatus}} as const
}

export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'UPDATE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}

// ==================Thunks
export const setTasksTC = (todolistId: string) => (dispatch: any, getState: any) => {
    taskApi.getTasks(todolistId).then(res => {
        dispatch(setTasksAC(todolistId, res.data.items))
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: any, getState: any) => {
    taskApi.addTask(todolistId, title).then(res => {
        console.log('res.data', res.data);
        dispatch(addTaskAC(res.data.data.item))
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: any, getState: any) => {
    taskApi.removeTask(todolistId, taskId)
}

import {v1} from "uuid";
// import {addTodoListAC, setTodoListsAC, todolistID1, todolistID2} from "./todoListReducer";
import {addTodoListAC, setTodoListsAC} from "./todoListReducer";

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
    id: string
    title: string
    isDone: boolean
}

type InitialTasksStateType = {
    [key: string]: TaskType[]
}


type RemoveTaskTypeAC = ReturnType<typeof removeTaskAC>
type AddTaskTypeAC = ReturnType<typeof addTaskAC>
type ChangeTaskStatusTypeAC = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskTitleTypeAC = ReturnType<typeof updateTaskTitleAC>
type AddTodoListActionType = ReturnType<typeof addTodoListAC>
type SetTodoListActionType = ReturnType<typeof setTodoListsAC>


type TaskReducerType =
    RemoveTaskTypeAC
    | AddTaskTypeAC
    | ChangeTaskStatusTypeAC
    | UpdateTaskTitleTypeAC
    | AddTodoListActionType
    | SetTodoListActionType


export const taskReducer = (state: InitialTasksStateType = initialTasksState, action: TaskReducerType): InitialTasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const {todoListId, taskId} = action.payload
            return {...state, [todoListId]: state[todoListId].filter(el => el.id !== taskId)}
        }
        case 'ADD-TASK': {
            const {todoListId, title} = action.payload
            return {...state, [todoListId]: [...state[todoListId], {id: v1(), title, isDone: false},]}
        }
        case 'CHANGE-TASK-STATUS': {
            const {todoListId, taskId, taskStatus} = action.payload
            return {
                ...state,
                [todoListId]: state[todoListId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
            }
        }
        case 'UPDATE-TASK-TITLE': {
            const {todoListId, taskId, title} = action.payload
            return {
                ...state, [todoListId]: state[todoListId].map(el => el.id === taskId ? {...el, title} : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.id]: []
            };
        }
        case 'SET-TODOLIST' : {
            return state
        }
        default:
            return state;
    }
};

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todoListId, taskId}} as const
}

export const addTaskAC = (todoListId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todoListId, title}} as const
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, taskStatus: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todoListId, taskId, taskStatus}} as const
}

export const updateTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {type: 'UPDATE-TASK-TITLE', payload: {todoListId, taskId, title}} as const
}

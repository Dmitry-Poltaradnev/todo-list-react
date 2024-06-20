import {TasksPropsType} from "../App";
import {v1} from "uuid";


export const taskReducer = (state: TasksPropsType, action: TaskReducerType): TasksPropsType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            const stateCopy = {...state}
            stateCopy[action.payload.todoListId] = stateCopy[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
            return stateCopy;
        }
        case 'ADD-TASK' : {
            const stateCopy = {...state}
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            stateCopy[action.payload.todoListId] = [...stateCopy[action.payload.todoListId], newTask]
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS' : {
            const stateCopy = {...state}
            stateCopy[action.payload.todoListId] = [...stateCopy[action.payload.todoListId].map(el => el.id === action.payload.taskId ? {
                ...el,
                isDone: action.payload.taskStatus
            } : el)]
            return stateCopy;
        }
        case 'UPDATE-TASK-TITLE' : {
            const stateCopy = {...state}
            stateCopy[action.payload.todoListId] = stateCopy[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                ...t,
                title: action.payload.title
            } : t)
            return stateCopy;
        }
        default:
            return state
    }
}

type TaskReducerType = RemoveTaskAction | AddTaskAction | ChangeTaskStatusAction | UpdateTaskTitle

type UpdateTaskTitle = {
    type: 'UPDATE-TASK-TITLE'
    payload: {
        todoListId: string,
        taskId: string,
        title: string
    }
}
export const UpdateTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {
            todoListId,
            taskId,
            title
        }
    } as const
}

// =====
type ChangeTaskStatusAction = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todoListId: string,
        taskId: string,
        taskStatus: boolean
    }
}

export const ChangeTaskStatusAC = (todoListId: string, taskId: string, taskStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            taskId,
            taskStatus
        }
    } as const
}
// ====
type RemoveTaskAction = {
    type: 'REMOVE-TASK'
    payload: {
        todoListId: string,
        taskId: string
    }
}
export const RemoveTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}
// ==========
type AddTaskAction = {
    type: 'ADD-TASK'
    payload: {
        todoListId: string,
        title: string
    }
}

export const AddTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            title
        }
    } as const
}
import {TasksPropsType} from "../App";
import {v1} from "uuid";

export const taskReducer = (state: TasksPropsType, action: TaskReducerType): TasksPropsType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            stateCopy[action.payload.todoListId] = stateCopy[action.payload.todoListId].filter(task => task.id !== action.payload.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            const stateCopy = {...state};
            stateCopy[action.payload.todoListId] = [...stateCopy[action.payload.todoListId], newTask];
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todoListId];
            stateCopy[action.payload.todoListId] = tasks.map(task => task.id === action.payload.taskId ? {
                ...task,
                isDone: action.payload.isDone
            } : task);
            return stateCopy;
        }
        case 'UPDATE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todoListId];
            stateCopy[action.payload.todoListId] = tasks.map(task => task.id === action.payload.taskId ? {
                ...task,
                title: action.payload.title
            } : task);
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.id]: [] // Создаем пустой массив задач для нового todolist
            };
        }
        default:
            return state;
    }
};

type TaskReducerType = RemoveTask | AddTask | ChangeTaskStatus | UpdateTaskTitle | AddTodoList

export const RemoveTaskAC = (todoListId: string, taskId: string): RemoveTask => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            taskId
        }
    };
};
type RemoveTask = {
    type: 'REMOVE-TASK',
    payload: {
        todoListId: string,
        taskId: string
    }
};

export const AddTaskAC = (todoListId: string, title: string): AddTask => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            title
        }
    };
};
type AddTask = {
    type: 'ADD-TASK',
    payload: {
        todoListId: string,
        title: string
    }
};

export const ChangeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean): ChangeTaskStatus => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            taskId,
            isDone
        }
    };
};
type ChangeTaskStatus = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todoListId: string,
        taskId: string,
        isDone: boolean
    }
};

export const UpdateTaskTitleAC = (todoListId: string, taskId: string, title: string): UpdateTaskTitle => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {
            todoListId,
            taskId,
            title
        }
    };
};
type UpdateTaskTitle = {
    type: 'UPDATE-TASK-TITLE',
    payload: {
        todoListId: string,
        taskId: string,
        title: string
    }
};

export const AddTodoListAC = (title: string): AddTodoList => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            id: v1(), // генерируем новый id
            title
        }
    };
};
type AddTodoList = {
    type: 'ADD-TODOLIST',
    payload: {
        id: string,
        title: string
    }
};



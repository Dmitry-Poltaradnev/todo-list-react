import {TasksPropsType} from "../App";
import {v1} from "uuid";
import {todolistID1, todolistID2} from "./todoListReducer";


const initialTasksState: TasksPropsType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
}

export const taskReducer = (state: TasksPropsType = initialTasksState, action: TaskReducerType): TasksPropsType => {
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
            const {todoListId, taskId, isDone} = action.payload
            return {
                ...state,
                [todoListId]: state[todoListId].map(el => el.id === taskId ? {...el, isDone} : el)
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
    }
};
type AddTodoList = {
    type: 'ADD-TODOLIST',
    payload: {
        id: string,
        title: string
    }
};



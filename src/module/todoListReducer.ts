import {v1} from "uuid";

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState: TodoListType[] = [
    {id: todolistID1, title: 'What to learn'},
    {id: todolistID2, title: 'What to buy'},
]

type TodoListType = {
    id: string,
    title: string,
}

type TodoListReducerType =
    RemoveTodoListActionType
    | UpdateTodoListTitleActionType
    | AddTodoListActionType;

type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleAC>
type AddTodoListActionType = ReturnType<typeof addTodoListAC>

export const todoListReducer = (state: TodoListType[] = initialState, action: TodoListReducerType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload
            return state.filter(el => el.id !== id);
        }
        case 'UPDATE-TODOLIST-TITLE': {
            const {id, title} = action.payload
            return state.map(el => el.id === id ? {...el, title} : el);
        }
        case 'ADD-TODOLIST': {
            const {id, title} = action.payload
            return [...state, {id: id, title}]
        }
        default:
            return state;
    }
};

export const removeTodoListAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
}

export const updateTodoListTitleAC = (id: string, title: string) => {
    return {type: 'UPDATE-TODOLIST-TITLE', payload: {id, title}} as const
}

export const addTodoListAC = (title: string) => {
    const id = v1()
    return {type: 'ADD-TODOLIST', payload: {id, title}} as const
}



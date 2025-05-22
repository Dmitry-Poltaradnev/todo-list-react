// const initialState: TodoListType[] = [
//     {id: todolistID1, title: 'What to learn'},
//     {id: todolistID2, title: 'What to buy'},
// ]

const initialState: TodoListType[] = []

type TodoListType = {
    id: string,
    title: string,
}

type TodoListReducerType =
    RemoveTodoListActionType
    | UpdateTodoListTitleActionType
    | AddTodoListActionType
    | SetTodoListActionType

type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleAC>
type AddTodoListActionType = ReturnType<typeof addTodoListAC>
type SetTodoListActionType = ReturnType<typeof setTodoListsAC>

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
            return [{id: id, title}, ...state]
        }
        case 'SET-TODOLIST' : {
            const {todoLists} = action.payload
            return [...todoLists]
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

export const addTodoListAC = (id: string, title: string) => {
    return {type: 'ADD-TODOLIST', payload: {id, title}} as const
}

export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {type: 'SET-TODOLIST', payload: {todoLists}} as const
}



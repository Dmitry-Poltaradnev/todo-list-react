import './App.css';
import {Todolist} from "./TodoList";
import {useReducer} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, taskReducer, UpdateTaskTitleAC} from "./module/taskReducer";
import {AddTodoListAC, RemoveTodoListAC, todoListReducer, UpdateTodoListTitleAC} from "./module/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksPropsType = {
    [key: string]: TaskType[]
}

let todolistID1 = v1()
let todolistID2 = v1()

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {


    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)

    const dispatch = useDispatch()

    // let [todolists, dispatchTodolist] = useReducer(todoListReducer, [
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])

    // let [tasks, dispatchTasks] = useReducer(taskReducer, {
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    // })

    const removeTodoList = (id: string) => {
        dispatch(RemoveTodoListAC(id))
    }

    const updateTodoListTitle = (todoListId: string, title: string) => {
        dispatch(UpdateTodoListTitleAC(todoListId, title))
    }

    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title));
    };

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todoListId, taskId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatch(AddTaskAC(todoListId, title))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
        dispatch(ChangeTaskStatusAC(todoListId, taskId, taskStatus))
    }

    const updateTask = (todoListId: string, taskId: string, title: string) => {
        dispatch(UpdateTaskTitleAC(todoListId, taskId, title))
    }


    return (
        <div className="App">
            <Container style={{minWidth: '1700px'}} fixed>
                <Grid sx={{m: '40px 0px'}} container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container>
                    {todolists.map(i => {
                        let tasksForTodolist = tasks[i.id]

                        return (
                            <Grid sx={{m: '20px'}} item>
                                <Paper sx={{p: '20px'}} elevation={12}>
                                    <Todolist
                                        updateTodoListTitle={updateTodoListTitle}
                                        updateTask={updateTask}
                                        removeTodoList={removeTodoList}
                                        key={i.id}
                                        todoListId={i.id}
                                        title={i.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
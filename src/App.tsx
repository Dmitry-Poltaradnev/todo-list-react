import './App.css';
import {Todolist} from "./TodoList";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, taskReducer, UpdateTaskTitleAC} from "./module/taskReducer";
import {AddTodoListAC, RemoveTodoListAC, todoListReducer, UpdateTodoListTitleAC} from "./module/todoListReducer";

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


    // let [todolists, setTodolists] = useState<TodolistType[]>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    let [todolists, dispatchTodolist] = useReducer(todoListReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    // let [tasks, setTasks] = useState<TasksPropsType>({
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
    let [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const removeTodoList = (id: string) => {
        dispatchTodolist(RemoveTodoListAC(id))
        // setTodolists(todolists.filter(i => i.id !== todoListId))
    }
    const updateTodoListTitle = (todoListId: string, title: string) => {
        dispatchTodolist(UpdateTodoListTitleAC(todoListId, title))
        // setTodolists(todolists.map(i => i.id === todoListId ? {...i, title} : i))
    }

    const addTodoList = (title: string) => {
        dispatchTodolist(AddTodoListAC(title))
        // const id = v1()
        // const newList: TodolistType = {id: id, title: title, filter: 'all'}
        // setTodolists([...todolists, newList])
        // setTasks({...tasks, [id]: []})
    }
    // =========
    const removeTask = (todoListId: string, taskId: string) => {
        dispatchTasks(RemoveTaskAC(todoListId, taskId))
        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(i => taskId !== i.id)})
    }

    const addTask = (todoListId: string, title: string) => {
        dispatchTasks(AddTaskAC(todoListId, title))
        // const newTask = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const newTasks = {...tasks, [todoListId]: [...tasks[todoListId], newTask]};
        // setTasks(newTasks)
    }

    const changeTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
        dispatchTasks(ChangeTaskStatusAC(todoListId, taskId, taskStatus))
        // setTasks({...tasks, [todoListId]: tasks[todoListId].map(i => taskId === i.id ? {...i, isDone: taskStatus} : i)})
    }

    const updateTask = (todoListId: string, taskId: string, title: string) => {
        dispatchTasks(UpdateTaskTitleAC(todoListId, taskId, title))
        // setTasks({...tasks, [todoListId]: tasks[todoListId].map(i => i.id === taskId ? {...i, title} : i)})
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
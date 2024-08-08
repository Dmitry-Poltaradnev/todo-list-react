import './App.css';
import {Todolist} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, UpdateTaskTitleAC} from "./module/taskReducer";
import {AddTodoListAC, RemoveTodoListAC, UpdateTodoListTitleAC} from "./module/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {useCallback} from "react";

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

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTodoList = useCallback((id: string) => {
        dispatch(RemoveTodoListAC(id))
    }, [dispatch])

    const updateTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(UpdateTodoListTitleAC(todoListId, title))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title));
    }, [dispatch]);

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todoListId, taskId))
    }, [dispatch])

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(AddTaskAC(todoListId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todoListId: string, taskId: string, taskStatus: boolean) => {
        dispatch(ChangeTaskStatusAC(todoListId, taskId, taskStatus))
    }, [dispatch])

    const updateTask = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(UpdateTaskTitleAC(todoListId, taskId, title))
    }, [dispatch])


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
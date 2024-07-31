import './App.css';
import {Todolist} from "./TodoList";
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

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)

    const dispatch = useDispatch()

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
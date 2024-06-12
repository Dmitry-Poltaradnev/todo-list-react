import './App.css';
import {Todolist} from "./TodoList";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksPropsType = {
    [key: string]: TaskType[]
}

let todolistID1 = v1()
let todolistID2 = v1()

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksPropsType>({
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
    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(i => i.id !== todoListId))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(i => taskId !== i.id)})
    }

    const addTask = (todoListId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTasks = {...tasks, [todoListId]: [...tasks[todoListId], newTask]};
        setTasks(newTasks)
    }

    const changeTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(i => taskId === i.id ? {...i, isDone: taskStatus} : i)})
    }

    const updateTask = (todoListId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(i => i.id === taskId ? {...i, title} : i)})
    }

    const updateTodoListTitle = (todoListId: string, title: string) => {
        setTodolists(todolists.map(i => i.id === todoListId ? {...i, title} : i))
    }

    const addTodoList = (title: string) => {
        const id = v1()
        const newList: TodolistType = {id: id, title: title, filter: 'all'}
        setTodolists([...todolists, newList])
        setTasks({...tasks, [id]: []})
    }

    return (
        <div className="App">

            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>


            <Container style={{minWidth: '1700px'}} fixed>
                <AddItemForm addItem={addTodoList}/>
                {todolists.map(i => {
                    let tasksForTodolist = tasks[i.id]

                    return (<Todolist
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
                    />)
                })
                }
            </Container>



        </div>
    );
}

export default App;
import './App.css';
import {Todolist} from "./TodoList";
import {useState} from "react";
import {v1} from "uuid";

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
        console.log(todoListId)
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

    return (
        <div className="App">
            {todolists.map(i => {
                let tasksForTodolist = tasks[i.id]

                return <Todolist
                    removeTodoList={removeTodoList}
                    key={i.id}
                    todoListId={i.id}
                    title={i.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />
            })
            }

        </div>
    );
}

export default App;
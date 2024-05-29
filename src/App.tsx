import './App.css';
import {Todolist} from "./TodoList";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

let todolistID1 = v1()
let todolistID2 = v1()

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'active'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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

    // =====

    const removeTask = (todoListId: string,taskId: string) => {
       setTasks( {...tasks,[todoListId]:tasks[todoListId].filter(i => taskId !== i.id)})



        // const filteredTasks = tasks.filter((task) => {
        //     return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        // const newTask = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(i => i.id === todoListId ? {...i, filter: filter} : i))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        // const newState = tasks.map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
        // setTasks(newState)
    }


    return (
        <div className="App">
            {todolists.map(i => {
                let tasksForTodolist = tasks[i.id]
                if (i.filter === 'active') {
                    tasksForTodolist = tasks[i.id].filter(task => !task.isDone)
                }
                if (i.filter === 'completed') {
                    tasksForTodolist = tasks[i.id].filter(task => task.isDone)
                }
                return <Todolist
                    key={i.id}
                    todoListId={i.id}
                    title={i.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={i.filter}
                />
            })
            }

        </div>
    );
}

export default App;
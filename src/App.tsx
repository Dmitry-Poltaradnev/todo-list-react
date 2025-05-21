import './App.css';
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import {TodoLists} from "./TodoLists";
import {addTodoListAC, setTodoListsAC} from "./module/todoListReducer";
import {Button} from "./Button";
import {AppRootStateType} from "./store";
import {ThemeType, toggleThemeAC} from "./module/themeRedeucer";
import {useEffect} from "react";
import {todoListApi} from "./api/todolist-api";

function App() {

    const dispatch = useDispatch();


    useEffect(() => {
        todoListApi.getTodoLists().then((res) =>
            dispatch(setTodoListsAC(res.data)))
    }, [dispatch]);


    // useEffect(() => {
    //     const title = 'Redux';
    //     todoListApi.addTodoList(title)
    // }, []);

    // useEffect(() => {
    //     const todoId = "2dd09709-1bed-4c9a-894c-eb3c9f6c7177"
    //     const title = 'LearnBeach1'
    //     todoListApi.updateTodoList(todolistId, title)
    // }, []);

    // useEffect(() => {
    //     const todoId = 'c443cd68-34d5-4328-a871-94312e6c0843'
    //     todoListApi.removeTodoList(todoId)
    // }, []);


    const addTodListHandler = (title: string) => {
        dispatch(addTodoListAC(title))
        todoListApi.addTodoList(title)
    }

    const themeValue = useSelector<AppRootStateType, ThemeType>(state => state.theme)

    return <div className="App">
        <div className={themeValue === ThemeType.White ? 'whiteTheme' : 'blackTheme'}>
            <Container style={{minWidth: '1700px'}} fixed>
                <Button title={'Change theme'} className={'btnChangeTheme'} onClick={() => dispatch(toggleThemeAC())}/>
                <Grid sx={{m: '40px 0px'}} container>
                    <AddItemForm addItem={addTodListHandler}/>
                </Grid>
                <Grid container>
                    <TodoLists/>
                </Grid>
            </Container>
        </div>
    </div>
}

export default App;
import './App.css';
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useSelector} from "react-redux";
import {TodoLists} from "./TodoLists";
import {addTodoListAC, getTodosTC} from "./module/todoListReducer";
import {Button} from "./Button";
import {AppRootStateType, useAppDispatch} from "./store";
import {ThemeType, toggleThemeAC} from "./module/themeRedeucer";
import {useEffect} from "react";
import {todoListApi} from "./api/todolist-api";

function App() {
    // Мы используем вместо dispatch новый кастомный useAppDispatch из store чтобы каждый раз не типизировать
    // genericami каждый dispatch
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodosTC())
    }, [dispatch]);

    const addTodListHandler = (title: string) => {
        todoListApi.addTodoList(title).then(res => {
            dispatch(addTodoListAC(res.data.data.item.id, title))
        })
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
import './App.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useSelector} from "react-redux";
import {TodoLists} from "./TodoLists/TodoLists";
import {addTodoListTC, getTodosTC, TodoListType} from "./module/todoListReducer";
import {Button} from "./components/Button/Button";
import {AppRootStateType, useAppDispatch} from "./store";
import {RequestStatusType, ThemeType, toggleThemeAC} from "./module/appRedeucer";
import {useEffect} from "react";
import {SkeletonTodoList} from "./components/SkeletonTodoList/SkeletonTodoList";
import {ErrorSnackBar} from "./components/ErrorSnackBar/ErrorSnackBar";

function App() {
    // Мы используем вместо dispatch новый кастомный useAppDispatch из store чтобы каждый раз не типизировать
    // genericami каждый dispatch
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodosTC())
    }, [dispatch]);

    const addTodListHandler = (title: string) => {
        dispatch(addTodoListTC(title))
    }

    const themeValue = useSelector<AppRootStateType, ThemeType>(state => state.app.theme)
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.appStatus)
    const todoListsCount = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)

    const skeletonCount = todoListsCount.length > 0 ? todoListsCount.length : 3

    return <div className="App">
        <div className={themeValue === ThemeType.White ? 'whiteTheme' : 'blackTheme'}>
            <ErrorSnackBar/>
            <Container style={{minWidth: '1700px'}} fixed>
                <Button title={'Change theme'} className={'btnChangeTheme'}
                        onClick={() => dispatch(toggleThemeAC())}/>
                <Grid sx={{m: '40px 0px'}} container>
                    <AddItemForm addItem={addTodListHandler}/>
                </Grid>
                <Grid container>
                    {
                        appStatus === 'loading' ?
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'column'
                            }}> {Array.from({length: skeletonCount}).map((_, i) => <SkeletonTodoList key={i}/>)}
                            </div> : <TodoLists/>
                    }
                </Grid>
            </Container>
        </div>
    </div>

}

export default App;
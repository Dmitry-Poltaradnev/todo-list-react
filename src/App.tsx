import './App.css';
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useSelector} from "react-redux";
import {TodoLists} from "./TodoLists";
import {addTodoListTC, getTodosTC} from "./module/todoListReducer";
import {Button} from "./Button";
import {AppRootStateType, useAppDispatch} from "./store";
import {RequestStatusType, ThemeType, toggleThemeAC} from "./module/appRedeucer";
import {useEffect} from "react";
import {SkeletonTodoList} from "./SkeletonTodoList";

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

    return (<div className="App">
            <div className={themeValue === ThemeType.White ? 'whiteTheme' : 'blackTheme'}>
                <Container style={{minWidth: '1700px'}} fixed>
                    <SkeletonTodoList/>
                    <Button title={'Change theme'} className={'btnChangeTheme'}
                            onClick={() => dispatch(toggleThemeAC())}/>
                    <Grid sx={{m: '40px 0px'}} container>
                        <AddItemForm addItem={addTodListHandler}/>
                    </Grid>
                    <Grid container>
                        <TodoLists/>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default App;
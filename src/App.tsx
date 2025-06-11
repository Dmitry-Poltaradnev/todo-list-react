import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useSelector} from "react-redux";
import {getTodosTC} from "./module/todoListReducer";
import {Button} from "./components/Button/Button";
import {AppRootStateType, useAppDispatch} from "./store";
import {ThemeType, toggleThemeAC} from "./module/appReducer";
import React, {useEffect} from "react";
import {ErrorSnackBar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {Routing} from "./common/routing/Routing";

function App() {
    // Мы используем вместо dispatch новый кастомный useAppDispatch из store чтобы каждый раз не типизировать
    // genericami каждый dispatch
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodosTC())
    }, [dispatch]);

    const themeValue = useSelector<AppRootStateType, ThemeType>(state => state.app.theme)

    return <div className="App">
        <div className={themeValue === ThemeType.White ? 'whiteTheme' : 'blackTheme'}>
            <ErrorSnackBar/>
            <Container style={{minWidth: '1700px'}} fixed>
                <Button title={'Change theme'} className={'btnChangeTheme'}
                        onClick={() => dispatch(toggleThemeAC())}/>
                <Grid container>
                    <Routing/>
                </Grid>
            </Container>
        </div>
    </div>
}

export default App;
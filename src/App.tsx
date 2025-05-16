import './App.css';
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import {TodoLists} from "./TodoLists";
import {addTodoListAC} from "./module/todoListReducer";
import {Button} from "./Button";
import {AppRootStateType} from "./store";
import {ThemeType, toggleThemeAC} from "./module/themeRedeucer";

function App() {

    const dispatch = useDispatch();

    const addTodListHandler = (title: string) => {
        dispatch(addTodoListAC(title))
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
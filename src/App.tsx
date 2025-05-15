import './App.css';
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useDispatch} from "react-redux";
import {TodoLists} from "./TodoLists";
import {addTodoListAC} from "./module/todoListReducer";

function App() {

    const dispatch = useDispatch();

    const addTodListHandler = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    return <div className="App">
        <Container style={{minWidth: '1700px'}} fixed>
            <Grid sx={{m: '40px 0px'}} container>
                <AddItemForm addItem={addTodListHandler}/>
            </Grid>
            <Grid container>
                <TodoLists/>
            </Grid>
        </Container>
    </div>
}

export default App;
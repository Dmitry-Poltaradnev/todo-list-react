import {Route, Routes} from "react-router-dom";
import {Login} from "../../login/Login";
import {TodoLists} from "../../TodoLists/TodoLists";
import {PageNotFound} from "../../components/PageNotFound/PageNotFound";

export const Path = {
    TodoLists: '/todo-list-react',
    Login: '/login',
    NotFound: '*',
} as const

export const Routing = () => (
    <Routes>
        <Route path={Path.TodoLists} element={<TodoLists/>}/>
        <Route path={Path.Login} element={<Login/>}/>
        <Route path={Path.NotFound} element={<PageNotFound/>}/>
    </Routes>
)

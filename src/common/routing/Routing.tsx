import { Route, Routes } from "react-router-dom"
import { Login } from "../../features/auth/ui/Login/Login"
import { PageNotFound } from "../components/PageNotFound/PageNotFound"
import { Main } from "../../app/Main"

export const Path = {
  Main: "/todo-list-react",
  Login: "/login",
  NotFound: "*",
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)

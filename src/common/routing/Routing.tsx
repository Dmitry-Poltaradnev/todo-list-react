import { Route, Routes } from "react-router-dom"
import { Login } from "../../features/auth/ui/Login/Login"
import { PageNotFound } from "../components/PageNotFound/PageNotFound"
import { Main } from "../../app/Main"
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute"
import { useAppSelector } from "../hooks/useAppSelector"
import { selectIsLoggedIn } from "../../features/todolists/model/auth-slice"

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}

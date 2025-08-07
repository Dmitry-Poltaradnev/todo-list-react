import s from "./App.module.css"
import React, { useEffect } from "react"
import { ErrorSnackBar } from "../common/components/ErrorSnackBar/ErrorSnackBar"
import { Header } from "../common/components/Header/Header"
import { Routing } from "../common/routing/Routing"
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { meTC } from "../features/todolists/model/auth-slice"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

  return (
    <div className={s.App}>
      <ErrorSnackBar />
      <Header />
      <Routing />
    </div>
  )
}

export default App

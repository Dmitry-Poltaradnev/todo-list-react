import React from "react"
import { Button } from "../Button/Button"
import { toggleThemeAC } from "../../../features/todolists/model/app-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import s from "../../theme/Theme.module.css"
import { logoutTC, selectIsLoggedIn } from "../../../features/todolists/model/auth-slice"
import { useAppSelector } from "../../hooks/useAppSelector"

export const Header = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn: boolean = useAppSelector(selectIsLoggedIn)

  return (
    <div>
      {isLoggedIn && <Button onClick={() => dispatch(logoutTC())} className={s.btnChangeTheme} title={"Logout"} />}
      <Button title={"Change theme"} className={s.btnChangeTheme} onClick={() => dispatch(toggleThemeAC())} />
    </div>
  )
}

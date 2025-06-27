import { useAppSelector } from "../hooks/useAppSelector"
import { selectAppTheme, ThemeType } from "../../features/todolists/model/app-slice"
import { FC, ReactNode } from "react"
import s from "./Theme.module.css"

export const ThemeWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const themeValue = useAppSelector(selectAppTheme)

  return <div className={themeValue === ThemeType.White ? s.whiteTheme : s.blackTheme}>{children}</div>
}

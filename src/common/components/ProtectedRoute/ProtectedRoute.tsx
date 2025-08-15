import { Path } from "../../routing/Routing"
import { Navigate, Outlet } from "react-router-dom"
import { ReactNode } from "react"

type Props = {
  isAllowed: boolean
  children?: ReactNode
  redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: Props): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return <>{children ?? <Outlet />}</>
}

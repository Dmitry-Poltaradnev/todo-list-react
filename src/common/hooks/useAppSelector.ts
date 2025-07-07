import { useSelector } from "react-redux"
import { AppRootStateType } from "../types/types"

export const useAppSelector = useSelector.withTypes<AppRootStateType>()

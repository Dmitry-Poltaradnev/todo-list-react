import { useDispatch } from "react-redux"
import { AppDispatch } from "../types/types"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

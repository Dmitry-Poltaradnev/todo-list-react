import {useSelector} from "react-redux";
import {AppRootStateType} from "../store";

export const useAppSelector = useSelector.withTypes<AppRootStateType>()
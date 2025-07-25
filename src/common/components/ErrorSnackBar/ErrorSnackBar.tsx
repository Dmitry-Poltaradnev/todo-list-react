import * as React from "react"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useSelector } from "react-redux"
import { changeStatusAppAC, RequestStatus, setAppErrorAC } from "../../../features/todolists/model/app-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { AppRootStateType } from "../../types/types"

export const ErrorSnackBar = () => {
  const error = useSelector<AppRootStateType, string | null>((state) => state.app.error)

  // const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppErrorAC(null))
    dispatch(changeStatusAppAC(RequestStatus.Succeeded))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}

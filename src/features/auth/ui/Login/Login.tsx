import { Grid } from "@mui/material"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { loginTC } from "../../../todolists/model/auth-slice"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch"

export type LoginFormType = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({ defaultValues: { email: "", password: "", rememberMe: false } })

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginFormType> = (data: LoginFormType) => {
    console.log(data)
    dispatch(loginTC(data, navigate))
    // reset()
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent={"center"}>
          <FormControl>
            <FormLabel>
              <p>
                To login get registered
                <a href="https://social-network.samuraijs.com" target="_blank" rel="noreferrer">
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>
                <b>Email:</b> poltaradnev@gmail.com
              </p>
              <p>
                <b>Password:</b> xueta_vash_google
              </p>
            </FormLabel>
            <FormGroup>
              <TextField
                error={!!errors.email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Incorrect email address",
                  },
                })}
                label="Email"
                margin="normal"
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password cannot be less than 6 symbols",
                  },
                })}
              />
              {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Controller
                    name={"rememberMe"}
                    control={control}
                    render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                  />
                }
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </Grid>
      </form>
    </Grid>
  )
}

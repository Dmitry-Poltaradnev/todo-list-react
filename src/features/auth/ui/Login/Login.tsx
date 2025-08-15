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
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const loginScheme = z.object({
  email: z.email(),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export type LoginFormType = z.infer<typeof loginScheme>

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(loginScheme),
  })

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<LoginFormType> = (data: LoginFormType) => {
    dispatch(loginTC({ data }))
    // reset()
  }
  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent={"center"}>
          <FormControl>
            <FormLabel>
              <b>Email:</b> poltaradnev@gmail.com
              <p>
                <b>Password:</b> xueta_vash_google
              </p>
            </FormLabel>
            <FormGroup>
              <TextField error={!!errors.email} {...register("email")} label="Email" margin="normal" />
              {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
              <TextField type="password" label="Password" margin="normal" {...register("password")} />
              {errors.password && (
                <span className={styles.errorMessage}>{"Password must be at least 3 characters long"}</span>
              )}
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

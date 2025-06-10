import {Grid} from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import styles from './Login.module.css'

type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    // const themeMode = useAppSelector(selectThemeMode)

    // const theme = getTheme(themeMode)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm<Inputs>({defaultValues: {email: '', password: '', rememberMe: false}})


    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
        reset()
    }

    return (
        <Grid container justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To login get registered
                                <a
                                    // style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                                    href="https://social-network.samuraijs.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>
                                <b>Email:</b> free@samuraijs.com
                            </p>
                            <p>
                                <b>Password:</b> free
                            </p>
                        </FormLabel>
                        <FormGroup>
                            <TextField error={!!errors.email}
                                       {...register('email', {
                                           required: 'Email is required',
                                           pattern: {
                                               value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                               message: 'Incorrect email address',
                                           },
                                       })} label="Email" margin="normal"/>
                            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                            <TextField type="password" label="Password" margin="normal"/>

                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Controller
                                        name={'rememberMe'}
                                        control={control}
                                        render={({field: {value, ...rest}}) => <Checkbox {...rest} checked={value}/>}
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
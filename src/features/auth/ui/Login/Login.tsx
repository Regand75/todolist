import {selectThemeMode} from "@/app/model/app-slice.ts"
import {useAppSelector} from "@/common/hooks"
import {getTheme} from "@/common/theme"
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from "@mui/material/Grid"
import TextField from '@mui/material/TextField'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/features/auth/model/schemas";
import * as z from "zod"

type LoginInputsType = z.infer<typeof loginSchema>

export const Login = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<LoginInputsType>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", rememberMe: false },
    })

    const onSubmit: SubmitHandler<LoginInputsType> = (data) => {
        console.log(data);
        reset();
    }

    return (
        <Grid container justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>
                        To login get registered
                        <a
                            style={{color: theme.palette.primary.main, marginLeft: "5px"}}
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            helperText={errors.email?.message}
                            error={!!errors.email}
                            {...register("email")}
                        />
                        <Controller
                            name={"password"}
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <FormControlLabel
                            label="Remember me"
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
                </form>
            </FormControl>
        </Grid>
    )
}
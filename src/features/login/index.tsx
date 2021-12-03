import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {loginTC} from "../../app/app-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            ((!values.email) && (errors.email = 'Required')) || ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) && (errors.email = 'Invalid email address'))
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })

    // console.log(formik)
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={(e) => {
                formik.handleSubmit(e)
            }}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>

                        <TextField label="Email" margin="normal"
                                   error={!!formik.errors.email && formik.touched.email}
                                   helperText={formik.touched.email ? formik.errors.email : ' '}
                                   {...formik.getFieldProps('email')}/>

                        <TextField type="password" label="Password"
                                   value={formik.values.password}
                                   margin="normal" name={'password'}
                                   onChange={formik.handleChange}
                        />

                        <FormControlLabel label={'Remember me'} control={<Checkbox/>} name={'rememberMe'}
                                          value={formik.values.rememberMe} onChange={formik.handleChange}/>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>

                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}


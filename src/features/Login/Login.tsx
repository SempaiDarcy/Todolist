import React, {FC} from "react";
import {Button, FloatingLabel, Form, Stack} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import s from "./Login.module.css"
import {loginTC} from "../../bll/reducers/authReducer";


interface ILoginForm {
    email: string
    password: string
    rememberMe: boolean
}

export const Login: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    isLoggedIn && navigate('/')

    const {register, handleSubmit, formState: {errors}} = useForm<ILoginForm>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },

    });
    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        dispatch(loginTC({...data}))
    }


    return (
        <Stack gap={3} className="col-md-3 mx-auto">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label >
                        <p>To log in get registered
                            <a href="https://social-network.samuraijs.com/"
                               target="_blank"> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </Form.Label>
                    <hr/>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enter email"
                        className="mb-3"
                    >
                    <Form.Control type="email"
                                  placeholder="Enter email"
                                  {...register("email", {
                                      required: true,
                                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                                  })}
                    />
                    </FloatingLabel>
                    {errors.email?.type === 'required' &&
                        <p className={s.error_message} role="alert">Email is required</p>}
                    {errors.email?.type === 'pattern' &&
                        <p className={s.error_message} role="alert">Email is not valid</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enter password"
                        className="mb-3"
                    >
                    <Form.Control type="password"
                                  placeholder="Password"
                                  {...register("password", {
                                      required: true,
                                      minLength: 3
                                  })}
                    />
                    </FloatingLabel>
                    {errors.password?.type === 'required' &&
                        <p className={s.error_message} role="alert">Password is required</p>}
                    {errors.password?.type === 'minLength' &&
                        <p className={s.error_message} role="alert">Password should be more 3 symbols</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox"
                                label="Remember me"
                                {...register("rememberMe")}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Stack>
    )
}
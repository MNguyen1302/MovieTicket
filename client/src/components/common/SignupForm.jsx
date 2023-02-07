import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";

const SignupForm = ({ switchAuthState }) => {
    const dispatch = useDispatch();

    const [isRegisterRequest, setIsRegisterRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const signupForm = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            displayName: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .min(8, "username minumum 8 characters")
            .required("username is required"),
            password: Yup.string()
            .min(8, "password minumum 8 characters")
            .required("password is required"),
            displayName: Yup.string()
            .min(8, "display name minumum 8 characters")
            .required("display name is required"),
            confirmPassword: Yup.string()
            .min(8, "confirm password minumum 8 characters")
            .required("confirm password is required"),
        }),
        onSubmit: async values => {
            setErrorMessage(undefined);
            setIsRegisterRequest(true);

            const { response, err } = await userApi.signup(values);
            
            setIsRegisterRequest(false);

            if (response) {
                signupForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success("Sign up is success");
            }

            if (err) setErrorMessage(err);
        }
    })

    return (
        <Box component="form" onSubmit={signupForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    label="Username"
                    name="username"
                    fullWidth
                    value={signupForm.values.username}
                    onChange={signupForm.handleChange}
                    color="primary"
                    error={signupForm.touched.username && signupForm.errors.username !== undefined}
                    helperText={signupForm.touched.username && signupForm.errors.username}
                />
                <TextField
                    type="text"
                    label="Display Name"
                    name="displayName"
                    fullWidth
                    value={signupForm.values.displayName}
                    onChange={signupForm.handleChange}
                    color="primary"
                    error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
                    helperText={signupForm.touched.displayName && signupForm.errors.displayName}
                />
                <TextField
                    type="password"
                    label="Password"
                    name="password"
                    fullWidth
                    value={signupForm.values.password}
                    onChange={signupForm.handleChange}
                    color="primary"
                    error={signupForm.touched.password && signupForm.errors.password !== undefined}
                    helperText={signupForm.touched.password && signupForm.errors.password}
                />
                <TextField
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    fullWidth
                    value={signupForm.values.confirmPassword}
                    onChange={signupForm.handleChange}
                    color="primary"
                    error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
                    helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
                />

                <LoadingButton
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ marginTop: 4 }}
                    loading={isRegisterRequest}
                >
                    Sign up
                </LoadingButton>

                <Button
                    fullWidth
                    sx={{ marginTop: 1 }}
                    onClick={() => switchAuthState()}
                >
                    Sign in
                </Button>
            </Stack>
        </Box>
    )
}

export default SignupForm
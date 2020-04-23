/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import swal from "sweetalert";

import { Formik } from "formik";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

export default function Sign() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (values.email === "") {
                            errors.email = "Required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid email address";
                        } else if (values.password.length < 8) {
                            errors.password = "Minimum password 8 character";
                        }
                        return errors;
                    }}
                    onSubmit={async (values) => {
                        const url =
                            "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/userShop";
                        const response = await fetch(url);
                        const result = await response.json();

                        const loginUser = result.find(
                            (element) => element.email === values.email
                        );

                        if (loginUser === undefined) {
                            // alert("User tidak ditemukan");
                            swal({
                                title: "Alert!",
                                text: "Email tidak ditemukan!",
                                icon: "error",
                                button: "Ok",
                            });
                            history.push("/register");
                        } else if (
                            loginUser.password !== values.password ||
                            loginUser.email !== values.email
                        ) {
                            swal({
                                title: "Warning!",
                                text: "Email atau password salah",
                                icon: "error",
                                button: "Ok",
                            });
                        } else {
                            const dataLogin = {
                                id: loginUser.id,
                                name: loginUser.name,
                                userName: loginUser.userName,
                                email: loginUser.email,
                                image: loginUser.image,
                            };
                            swal({
                                title: "Succes!",
                                text: `Selamat datang, ${loginUser.name}`,
                                icon: "success",
                                button: "Ok",
                            });
                            localStorage.setItem("isLogin", true);
                            localStorage.setItem(
                                "userLogin",
                                JSON.stringify(dataLogin)
                            );
                            history.push("/dashboard");
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => {
                        return (
                            <form
                                onSubmit={handleSubmit}
                                className={classes.form}
                                noValidate
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="email"
                                            name="email"
                                            label="Email"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            variant="outlined"
                                        />

                                        <p
                                            style={{
                                                color: "red",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            {errors.email &&
                                                touched.email &&
                                                errors.email}
                                        </p>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="password"
                                            name="password"
                                            label="Password"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            variant="outlined"
                                        />
                                        <p
                                            style={{
                                                color: "red",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            {errors.password &&
                                                touched.password &&
                                                errors.password}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <p variant="body2">
                                            Don't have an account?{" "}
                                            <Link to="/register">Sign Up</Link>
                                        </p>
                                    </Grid>
                                </Grid>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </Container>
    );
}

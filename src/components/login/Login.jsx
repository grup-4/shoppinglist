/** @format */

import React from "react";
import { Formik } from "formik";
import { useHistory, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function Login() {
    const history = useHistory();
    return (
        <div>
            <h1>Halaman Masuk</h1>
            <div>
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

                        console.log(loginUser === undefined, "email");

                        if (loginUser === undefined) {
                            alert("User tidak ditemukan");
                            history.push("/register");
                        } else if (
                            loginUser.password !== values.password ||
                            loginUser.email !== values.email
                        ) {
                            alert("email/password salah");
                        } else {
                            const dataLogin = {
                                id: loginUser.id,
                                name: loginUser.name,
                                userName: loginUser.userName,
                                email: loginUser.email,
                                image: loginUser.image,
                            };
                            alert(`selamat datang kembali ${loginUser.name}`);
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
                            <form onSubmit={handleSubmit}>
                                <Grid
                                    container
                                    spacing={3}
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <TextField
                                            type="email"
                                            name="email"
                                            label="Email"
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
                                    <Grid item>
                                        <TextField
                                            type="password"
                                            name="password"
                                            label="Password"
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
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            size="large"
                                            disabled={isSubmitting}
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                                <p>
                                    Belum punya akun?{" "}
                                    <Link to="/register">SignUp</Link>
                                </p>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

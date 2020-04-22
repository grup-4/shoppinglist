/** @format */

import React from "react";
import { Formik } from "formik";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

export default function Register() {
    const history = useHistory();
    return (
        <div>
            <h1>Halaman Register</h1>
            <Formik
                initialValues={{
                    name: "",
                    userName: "",
                    email: "",
                    password: "",
                    createdAt: moment().format("MMMM Do YYYY"),
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
                onSubmit={(values) => {
                    const url =
                        "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/userShop";
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                        method: "POST",
                    };

                    fetch(url, options)
                        .then((response) => {
                            return response.json();
                        })
                        .then((result) => {
                            alert("register successfully");
                            history.push("/login");
                        });
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
                            <div>
                                <TextField
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    label="Full name"
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
                                    {errors.fullname &&
                                        touched.fullname &&
                                        errors.fullname}
                                </p>
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="userName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    label="Username"
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
                                    {errors.username &&
                                        touched.username &&
                                        errors.username}
                                </p>
                            </div>
                            <div>
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
                            </div>
                            <div>
                                <TextField
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    label="Password"
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
                            </div>
                            <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    SignUp
                                </Button>
                                <p>Sudah punya akun? <Link to="/login">Login</Link></p>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}

/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
                    Sign up
                </Typography>
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
                        if (values.name === ""){
                            errors.name = "Nama tidak boleh kosong"
                        }else if(values.userName === ""){
                            errors.userName = "Username tidak boleh kosong"
                        }else if (values.email === "") {
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
                                
                            swal({
                                title: "Succes!",
                                text: "Berhasil registerasi, silahkan login",
                                icon: "success",
                                button: "Ok",
                            });
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
                            <form
                                onSubmit={handleSubmit}
                                className={classes.form}
                                noValidate
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="text"
                                            name="name"
                                            fullWidth
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
                                            {errors.name &&
                                                touched.name &&
                                                errors.name}
                                        </p>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="text"
                                            name="userName"
                                            fullWidth
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
                                            {errors.userName &&
                                                touched.userName &&
                                                errors.userName}
                                        </p>
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
                                        <TextField
                                            type="password"
                                            name="password"
                                            fullWidth
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
                                            Already have an account?{" "}
                                            <Link to="/">Sign In</Link>
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

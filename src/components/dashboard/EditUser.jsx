/** @format */

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import moment from "moment";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Register(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const dataLogin = JSON.parse(localStorage.getItem("userLogin"));
            const response = await fetch(
                "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/userShop"
            );
            const result = await response.json();
            const filterUser = result.find((element) => {
                return element.id === dataLogin.id && element;
            });
            if (filterUser !== undefined) {
                setData(filterUser);
            }
        };

        getData();
    }, []);

    const history = useHistory();
    return (
        <div>
            <h2>Edit profile</h2>
            <Formik
                initialValues={{
                    name: data.name,
                    userName: data.userName,
                    email: data.email,
                    createdAt: moment().format("MMMM Do YYYY"),
                }}
                enableReinitialize={true}
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
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    const url = `https://5e8f22bbfe7f2a00165eeedf.mockapi.io/userShop/${data.id}`;
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                        method: "PUT",
                    };

                    const dataLogin = {
                        id: data.id,
                        name: values.name,
                        userName: values.userName,
                        email: data.email,
                        image: data.image,
                    };

                    fetch(url, options)
                        .then((response) => {
                            return response.json();
                        })
                        .then((result) => {
                            localStorage.setItem(
                                "userLogin",
                                JSON.stringify(dataLogin)
                            );
                            history.push("/profile");
                            window.location.reload();
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
                                    {errors.name && touched.name && errors.name}
                                </p>
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="userName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.userName}
                                    label="User Name"
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
                            </div>
                            <div>
                                <TextField
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    label="Email"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    disabled
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
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Update
                            </Button>
                            <Button style={{marginLeft:"10px"}}
                                variant="contained"
                                color="inherit"
                                onClick={props.close}
                            >
                                Cancel
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}

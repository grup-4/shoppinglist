/** @format */

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import moment from "moment";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Add() {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('userLogin'))
    return (
        <div>
            <h2>Add item</h2>
            <Formik
                initialValues={{
                    item: "",
                    deskripsi: "",
                    image: "",
                    createdAt: moment().format("MMMM Do YYYY"),
                    idKey: user.id,
                }}
                enableReinitialize={true}
                onSubmit={(values) => {
                    const url = `https://5e8f22bbfe7f2a00165eeedf.mockapi.io/shoppie`;
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
                            // history.push("/dashboard");
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
                                    name="item"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.item}
                                    label="Nama barang"
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
                                    type="text"
                                    name="deskripsi"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.deskripsi}
                                    label="Deskripsi"
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
                                    type="url"
                                    name="image"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.image}
                                    label="Url gambar"
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
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Add item
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}

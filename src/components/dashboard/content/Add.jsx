/** @format */

import React from "react";
import { Formik } from "formik";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Add() {
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
                validate={(values) => {
                    const errors = {};
                    if (values.item === ""){
                        errors.item = "Barang tidak boleh kosong"
                    }else if(values.deskripsi === ""){
                        errors.deskripsi = "Deskripsi tidak boleh kosong"
                    }
                    return errors;
                }}
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
                                    {errors.item&&
                                        touched.item &&
                                        errors.item}
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
                                    {errors.deskripsi &&
                                        touched.deskripsi &&
                                        errors.deskripsi}
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

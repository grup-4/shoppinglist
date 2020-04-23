/** @format */

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import moment from "moment";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Edit() {
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const dataLogin = JSON.parse(localStorage.getItem("userLogin"));
            const response = await fetch(
                "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/soppie"
            );
            const result = await response.json();
            const filterUser = result.find((element) => {
                return element.idKey === dataLogin.id && element;
            });
            if (filterUser !== undefined) {
                setData(filterUser);
            }
        };

        getData();

    }, []);
    
    console.log(data, "data")

    return (
        <div>
            <h2>Add item</h2>
            <Formik
                initialValues={{
                    item: data.item,
                    deskripsi: data.deskripsi,
                    image: data.image,
                    createdAt: moment().format("MMMM Do YYYY"),
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
                            history.push("/dashboard/dashboard");
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
                                    {errors.item && touched.item && errors.item}
                                </p>
                            </div>
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
                                    {errors.item &&
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
                                    disabled
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
                                    disabled
                                    variant="outlined"
                                />
                                <p
                                    style={{
                                        color: "red",
                                        fontStyle: "italic",
                                    }}
                                >
                                    {errors.image &&
                                        touched.image &&
                                        errors.image}
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
                            <Button
                                variant="contained"
                                color="default"
                                type="submit"
                                style={{ marginLeft: "10px" }}
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

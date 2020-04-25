/** @format */

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import moment from "moment";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Edit(props) {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [id, setId] = useState(props.id.id)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                `https://5e8f22bbfe7f2a00165eeedf.mockapi.io/shoppie/${id}`
            );
            const result = await response.json();
            if (result !== undefined) {
                setData(result);
            }
        };

        getData();
    }, [id]);

    return (
        <div>
            <h2>Edit item</h2>
            <Formik
                initialValues={{
                    item: data.item,
                    deskripsi: data.deskripsi,
                    image: data.image,
                    createdAt: moment().format("MMMM Do YYYY"),
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
                    const url = `https://5e8f22bbfe7f2a00165eeedf.mockapi.io/shoppie/${data.id}`;
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                        method: "PUT",
                    };
                    fetch(url, options)
                        .then((response) => {
                            return response.json();
                        })
                        .then((result) => {
                            history.push("/");
                            localStorage.removeItem('idItem')
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

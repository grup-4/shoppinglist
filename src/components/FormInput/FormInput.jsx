import React, { Component } from "react";
import { Formik } from "formik";
import moment from 'moment'
// import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "50%",
    },
}));

export function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Create
      </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Formik
                        initialValues={{
                            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
                            item: "",
                            image: "",
                            description: "",
                            userId: "1",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (values.item === "") {
                                errors.item = "Required";
                            } else if (values.image === "") {
                                errors.image = "Required";
                            }
                            else if (values.description === "") {
                                errors.description = "Required";
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            const url =
                                "https://5e8f1a42fe7f2a00165eee1d.mockapi.io/shopping-list";
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
                                    alert("add item successfully");
                                    window.location.reload()
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
                                <form className = {classes.paper} onSubmit={handleSubmit}>
                                    <div>
                                        <input
                                            type="text"
                                            name="item"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.item}
                                            placeholder="item"
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
                                        <input
                                            type="url"
                                            name="image"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.image}
                                            placeholder="image"
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
                                    <div>
                                        <input
                                            type="text"
                                            name="description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            placeholder="description"
                                        />
                                        <p
                                            style={{
                                                color: "red",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            {errors.description &&
                                                touched.description &&
                                                errors.description}
                                        </p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Add
                                    </button>
                                </form>
                            );
                        }}
                    </Formik>
                </Fade>
            </Modal>
        </div>
    );
}



class FormInput extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Halaman Daftar</h1>
                <div style={{ textAlign: "center" }}>
                    <TransitionsModal />
                </div>
            </div>
        );
    }
}

export default FormInput;
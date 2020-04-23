import React, { Component, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Formik } from "formik";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


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
    },
    root: {
        maxWidth: 345,
        flexGrow: 1,
    },
    media: {
        height: 140,
    },
}));

export function TransitionsModal(props) {
    const [id, setId] = useState(0)
    const [data, setData] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const getData = async () => {
            const idItem = JSON.parse(localStorage.getItem('id'))
            const response = await fetch("https://5e8f1a42fe7f2a00165eee1d.mockapi.io/shopping-list")
            const result = await response.json()
            console.log(idItem);
            
            const filterUser = result.find((element) => {
                return (
                    element.userId == idItem && element
                )
            })
            if (filterUser !== undefined) {
                setData(filterUser)
            }
        }
        getData()
    }, [])

    console.log(data, "data");

    const handleOpen = (index) => {
        setOpen(true);
        setId(index)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button type="button" onClick={() => { handleOpen(props.index) }}>
                Edit
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
                            // createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
                            item: data.item,
                            image: data.image,
                            description: data.description,
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
                            const data = {
                                item: values.item,
                                description: values.description,
                                image: values.image

                            }
                            const url =
                                `https://5e8f1a42fe7f2a00165eee1d.mockapi.io/shopping-list/${id}`;
                            const options = {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                                method: "PUT",
                            };


                            fetch(url, options)
                                .then((response) => {
                                    return response.json();
                                })
                                .then((result) => {
                                    alert("edit item successfully");
                                    // this.props.history.push("/signin");
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
                                <form className={classes.paper} onSubmit={handleSubmit}>
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
                                        edit
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

export class ResultList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    // const classes = useStyles();

    handleDelete = (index) => {
        // console.log(index, "data index");

        const url =
            `https://5e8f1a42fe7f2a00165eee1d.mockapi.io/shopping-list/${index}`;
        const options = {
            method: "DELETE",
        };

        fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                alert("delete item successfully");
                // this.props.history.push("/signin");
                window.location.reload()
            });

    }


    componentDidMount = () => {
        const url = "https://5e8f1a42fe7f2a00165eee1d.mockapi.io/shopping-list";

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        data: result,
                    };
                });
            });
    };

    render() {
        const classes = useStyles;
        return (
            <Grid container spacing={1}>
                {this.state.data.map((element, index) => (
                <Grid item xs={12} sm={3} spacing={3} key={index}>
                    < Card className={classes.root} >
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={element.image}
                                title="img1"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {element.item}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {element.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {element.createdAt}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button
                                onClick={() => {
                                    this.handleDelete(element.id);
                                }}
                            >
                                Delete
                </Button>
                            <TransitionsModal />
                        </CardActions>
                    </Card >
                </Grid>
                ))}
            </Grid>
        )
    }
}


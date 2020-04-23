/** @format */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Modal from "./ModalEditUser";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    content: {
        margin: "20px 0",
    },
});

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="lg">
                <Grid container spacing={2} className={classes.content}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={data.image}
                                    title={data.userName}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h3">
                                        {data.name}({data.userName})
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="inherit"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {data.createdAt}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {data.email}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={handleOpen}
                                    variant="contained"
                                >
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Modal handleClose={handleClose} open={open} />
                </Grid>
            </Container>
        </React.Fragment>
    );
}

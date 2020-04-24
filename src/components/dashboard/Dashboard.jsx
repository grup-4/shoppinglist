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
import MUser from "./ModalEditItem";
import ModalAdd from "./ModalAddItem";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "20px",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    media: {
        height: "300px",
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [buka, setBuka] = useState(false);
    const [data, setData] = useState([]);
    const [idItem, setIdItem] = useState("");

    useEffect(() => {
        const getData = async () => {
            const dataLogin = JSON.parse(localStorage.getItem("userLogin"));
            const response = await fetch(
                "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/shoppie"
            );

            const result = await response.json();
            const filterUser = result.filter((element) => {
                return element.idKey === dataLogin.id && element;
            });
            if (filterUser !== undefined) {
                setData(filterUser);
            }
        };

        getData();
    }, []);

    const handleDelete = async (id) => {
        const url = "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/shoppie";

        const data = await fetch(`${url}/${id}`, {
            method: "Delete",
        });
        await data.json();
        window.location.reload();
    };

    const handleBuka = () => {
        setBuka(true);
    };

    const handleTutup = () => {
        setBuka(false);
    };
    const handleOpen = (id) => {
        setOpen(true);
        setIdItem({ id });
        localStorage.setItem("idItem", JSON.stringify(id))
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Container componenet="main" maxWidth="lg" className={classes.root}>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ margin: "15px 0" }}
                    onClick={() => {handleBuka()}}
                >
                    Add Shopping List
                </Button>
                <Grid container spacing={2}>
                    {Array.isArray(data) && data.length > 0
                        ? data.map((element) => {
                              return (
                                  <Grid item xs={12} md={3} key={element.id}>
                                      <Card>
                                          <CardActionArea>
                                              <CardMedia
                                                  className={classes.media}
                                                  component="img"
                                                  image={element.image}
                                                  title="Contemplative Reptile"
                                              />
                                              <CardContent>
                                                  <Typography
                                                      variant="h5"
                                                      component="h2"
                                                  >
                                                      {element.item}
                                                  </Typography>
                                                  <Typography
                                                      gutterBottom
                                                      variant="inherit"
                                                      color="textSecondary"
                                                      component="p"
                                                  >
                                                      {element.createdAt}
                                                  </Typography>
                                                  <Typography
                                                      variant="body2"
                                                      component="p"
                                                  >
                                                      {element.deskripsi}
                                                  </Typography>
                                              </CardContent>
                                          </CardActionArea>
                                          <CardActions>
                                              <Button
                                                  size="small"
                                                  color="inherit"
                                                  onClick={() => {
                                                      handleOpen(element.id);
                                                  }}
                                                  variant="contained"
                                              >
                                                  Edit
                                              </Button>
                                              <Button
                                                  size="small"
                                                  color="secondary"
                                                  variant="contained"
                                                  onClick={() => {
                                                      handleDelete(element.id);
                                                  }}
                                              >
                                                  Delete
                                              </Button>
                                          </CardActions>
                                      </Card>
                                  </Grid>
                              );
                          })
                        : " "}
                    <MUser
                        handleClose={handleClose}
                        open={open}
                        id={idItem}
                        data={data}
                    />
                </Grid>
                <ModalAdd handleTutup={handleTutup} buka={buka} />
            </Container>
        </React.Fragment>
    );
}

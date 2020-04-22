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
    media: {
        height: 250,
    },
});

export default function Dashboard() {
    const classes = useStyles();
    const [buka, setBuka] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const dataLogin = JSON.parse(localStorage.getItem("userLogin"));
            console.log(dataLogin.id)
            let list = []
            const response = await fetch(
                "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/shoppie"
            );
            const result = await response.json();
            result.forEach((element) => {
                if (element.idKey == dataLogin.id){
                    list.push(element)
                }
            });
            console.log(list, 'element')
            if(list.length > 0){
                setData(list)
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

    const handleBuka = () => {
        setBuka(true);
    };

    const handleTutup = () => {
        setBuka(false);
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="lg">
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ margin: "15px 0" }}
                    onClick={handleBuka}
                >
                    Add Shoping List
                </Button>
                <Grid container spacing={2}>
                    {Array.isArray(data) && data.length > 0
                        ? data.map((element) => {
                              return (
                                  <Grid item xs={2} md={3} key={element.id}>
                                      <Card>
                                          <CardActionArea>
                                              <CardMedia
                                                  className={classes.media}
                                                  image={element.image}
                                                  title="Contemplative Reptile"
                                              />
                                              <CardContent>
                                                  <Typography
                                                      gutterBottom
                                                      variant="h5"
                                                      component="h2"
                                                  >
                                                      {element.item}
                                                  </Typography>
                                                  <Typography
                                                      variant="body2"
                                                      color="textSecondary"
                                                      component="p"
                                                  >
                                                      {element.deskripsi}
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
                                              <Button
                                                  size="small"
                                                  color="primary"
                                                  variant="contained"
                                              >
                                                  Learn More
                                              </Button>
                                          </CardActions>
                                      </Card>
                                  </Grid>
                              );
                          })
                        : "baru"}

                    <Modal handleClose={handleClose} open={open} />
                </Grid>
            </Container>
            <Modal handleTutup={handleTutup} buka={buka} />
        </React.Fragment>
    );
}

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
import Modal from "./ModalEditItem";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function Dashboard() {
    const classes = useStyles();
    const [buka, setBuka] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const dataLogin = JSON.parse(localStorage.getItem("userLogin"));
            console.log(dataLogin.id);
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

    console.log(data, 'data')

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

    return (
        <React.Fragment>
            <Container componenet="main" maxWidth="lg">
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
                                  <Grid item xs={12} md={3} key={element.id}>
                                      <Card>
                                          <CardActionArea>
                                              <CardMedia
                                                  component="img"
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
                                                  onClick={handleBuka}
                                                  variant="contained"
                                              >
                                                  Edit
                                              </Button>
                                              <Button
                                                  size="small"
                                                  color="primary"
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
                        : "baru"}
                </Grid>
            </Container>
            <Modal handleTutup={handleTutup} buka={buka} id={data.id} />
        </React.Fragment>
    );
}

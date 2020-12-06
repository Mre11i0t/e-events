import React, { useState, useContext, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Navbar from "./Layout/Navbar.js";
import Axios from "axios";
import userContext from "../Context/userContext.js";
import DLink from "@material-ui/core/Link";
import styles from "./Home.module.css";
import HorizontalSlider from "./Slider/Slider";

function SignedIn() {
  //this function also uses context, it returns a simple welcome message using userData
  //you are supposed to edit this, and fit to use
  const { userData, setUserData } = useContext(userContext);
  return (
    <>
      <Typography variant="h4">Welcome, {userData.user.name}</Typography>
    </>
  );
}

function Home() {
  const { userData, setUserData } = useContext(userContext);
  const [events, setEvents] = useState();
  useLayoutEffect(() => {
    let eventfunc = async () => {
      let result = await Axios.get("http://localhost:5000/events/getEvents");
      setEvents(result.data.eventData.events);
    };
    eventfunc();
  }, []);
  return (
    <>
      <Navbar />
      {
        userData.user ? (
          <>
            <SignedIn />
            <HorizontalSlider />
            <br></br>
            <Grid container direction="row" spacing={4}>
              {events ? (
                events.slice().map((item, index) => {
                  return (
                    <Grid md={3} item key={index}>
                      {/* <Card>
                            <CardHeader
                                title={`${item.eventname}`}
                            />
                            <CardContent>
                                <Typography>
                                    {item.description}
                                </Typography>
                                <Typography >
                                    <DLink href={item.url}>
                                        link
                                    </DLink>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button color = "inherit" variant = "text">
                                    Join
                                </Button>
                            </CardActions>
                        </Card> */}
                      <Card className={styles.card}>
                        <div className={styles.imageContainer}>
                          <img
                            src={`${item.imagelink}`}
                            alt={`${item.eventname}`}
                          />
                        </div>
                        <div className={styles.title}>
                          <h3>
                            <b>{`${item.eventname}`}</b>
                          </h3>
                          {/* <h6>{item.description}</h6> */}
                          <h6>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </h6>
                        </div>
                        <center>
                          <Button className={styles.addBtn} color="inherit">
                            {userData.user.id === "5fb101bd6ab4b44be8a1cbc8"
                              ? (<b>Modify Event</b>)
                              : (<b>Register</b>)}
                          </Button>
                        </center>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <></>
              )}
            </Grid>
          </>
        ) : (
          <></>
        ) //to make it easier to understand how context works!
      }
    </>
  );
}

export default Home;

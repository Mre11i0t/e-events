import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import userContext from "../../Context/userContext.js";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { userData, setUserData } = useContext(userContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            E-Events
          </Typography>
          {userData.user ? (
            userData.user.id === "5fb101bd6ab4b44be8a1cbc8" ? (
              <>
                <Button color="inherit">Manage Events</Button>
                <Button color="inherit" onClick={logout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit">Your Events</Button>
                <Button color="inherit" onClick={logout}>
                  Log Out
                </Button>
              </>
            )
          ) : (
            <>
              <Link
                to="/login"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                <Button color="inherit">Login</Button>
              </Link>
              <Link
                to="/register"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

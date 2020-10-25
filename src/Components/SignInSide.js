import React,{useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseLine from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Link from '@material-ui/core/Link';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Ev from "../Assets/EvLogo.png"
import Axios from 'axios';
import {useHistory} from 'react-router-dom'
import UserContext from "../Context/userContext.js"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        E-Events PESU &nbsp;
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Ev})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  generalB:{
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignInUser() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password,setPassword] = useState();
  const history = useHistory();
  const {setUserData} = useContext(UserContext)
  const submit = async(e)=>{
    e.preventDefault();
    const userC = {email, password};
    const loginRes = await Axios.post("http://localhost:5000/users/login",userC)
    localStorage.setItem('auth-token',loginRes.data.token)
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    })
    history.push('/')
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseLine />
      <Grid item md={7} className={classes.image} />
      <Grid item md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleRoundedIcon fontSize = "large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit = {submit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="Email"
              onChange = {(e)=>{setEmail(e.target.value)}}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="Password"
              id="Password"
              onChange = {(e)=>{setPassword(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              style={{height: "50px",}}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid item>
            <Link to = "/AdminLogin" style = {{textDecoration: 'none'}}>
            <Button
              fullWidth
              color = "secondary"
              className = {classes.generalB}
            >
              Admin? Click here
            </Button>
            </Link>
            </Grid>
            <Grid item>
              <Divider/>
            </Grid>
            <Grid>
              <Link to ="/register" style = {{textDecoration: 'none'}}>
              <Button
              fullWidth
              color="secondary"
              className = {classes.generalB}
              style={{height:"50px"}}
              variant="contained"
              >
              New User? Sign Up Here
              </Button>
              </Link>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

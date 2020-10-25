import React,{useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios'
import UserContext from '../Context/userContext.js'
import {useHistory} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [email, setEmail]=useState()
  const [password, setPassword]=useState()
  const [passwordCheck, setPasswordCheck]=useState()
  const [name, setName]=useState()
  const classes = useStyles();
  const {setUserData}=useContext(UserContext)
  const history  = useHistory();
  const submit = async (e) =>{
    e.preventDefault();
    const newUser = {email, password, passwordCheck, name};
    const registerRes = await Axios.post('http://localhost:5000/users/register', newUser);
    const loginRes = await Axios.post("http://localhost:5000/users/login", {email, password});
    setUserData({
      token:loginRes.data.token,
      user:loginRes.data.user
    })
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push('/');
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="Email"
                variant="outlined"
                required
                fullWidth
                id="Email"
                label="Email"
                onChange = {(e)=>{setEmail(e.target.value)}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange = {(e)=>{setPassword(e.target.value)}}
              />
            </Grid>
            <Grid item xs = {12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordCheck"
                label="PasswordCheck"
                type="password"
                id="passwordCheck"
                onChange = {(e)=>{setPasswordCheck(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                onChange = {(e)=>{setName(e.target.value)}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}

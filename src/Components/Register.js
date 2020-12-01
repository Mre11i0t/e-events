import React,{useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios'
import UserContext from '../Context/userContext.js'
import Divider from '@material-ui/core/Divider';
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
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
    width: '100%', 
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
  const [error, setError]=useState()
  const classes = useStyles();
  const {setUserData}=useContext(UserContext)
  const history  = useHistory();
  const submit = async (e) =>{
    try{
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
    catch(err){
      if(err.response.data.msg){
        setError(err.response.data.msg);
      }
    }
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
        <Grid container spacing={2}>
        <Grid item xs = {12}>
              {
                (error)?<>
                <Box style={{ backgroundColor:'#E6B0AA'}} fullwidth= 'true' >
                <Grid container>
                <Grid item  md={1}>
                <ErrorOutlineIcon style={{color:'B00020'}}/>
                </Grid>
                <Grid item  md={11}>
                <Typography style = {{color:'#B00020', textAlign:"center"}}>
                  {error}
                </Typography>
                </Grid>
                </Grid>
                </Box>
                </>:<>
                </>
              }
        </Grid>
        <Grid item xs = {12}>
        <br/>
        <Divider/>
        <br/>
        <Link to = "/login" style = {{textDecoration: "none"}}>
          <Button
          color = "primary"
          fullWidth={true}>
            Already have an account? Sign in
          </Button>
        </Link>
        </Grid>
        </Grid>
      </div>
    </Container>
  );
}

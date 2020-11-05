import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Navbar from "./Layout/Navbar.js"
import userContext from "../Context/userContext.js"
function SignedIn(){
    //this function also uses context, it returns a simple welcome message using userData
    const {userData, setUserData} = useContext(userContext);
    return (
        <>
        <Typography variant = "h4">
            Welcome, {userData.user.name}
        </Typography>
        </>
    )
}
function Home(){
    const {userData, setUserData} = useContext(userContext);
    return(
        <>
        <Navbar/>
        {
        (userData.user)?<SignedIn/>:<></>//to make it easier to understand how context works!
        }
        </>
    )
}

export default Home;
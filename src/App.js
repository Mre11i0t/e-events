import React, {useState, useEffect} from 'react';
import './App.css';
import SignInUser from "./Components/SignInSide.js";
import {BrowserRouter,Switch, Route} from "react-router-dom";
import Home from "./Components/Home.js";
import Axios from "axios";
import UserContext from "./Context/userContext.js"
import SignUp from "./Components/Register.js"
import AddEvent from './Components/AddEvent/addEvent'

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })
  useEffect(()=>{
    const checkLoggedIn = async()=>{
      let token = localStorage.getItem("auth-token");
      if(token===null) {
        localStorage.setItem("auth-token","");
        token = "";
      };
      const tokenres = await Axios.post('http://localhost:5000/users/tokenisvalid', null, 
      {headers:{'x-auth-token':token}}
      );
      if(tokenres.data){
        const userRes = await Axios.get("http://localhost:5000/users/", {headers:{'x-auth-token':token}},
        );
      setUserData({
        token,
        user:userRes.data,
      })
      }
    };
    checkLoggedIn()
  },[])
  return (
    <>
      <BrowserRouter>
      <UserContext.Provider value = {{userData, setUserData}}>
      <Switch>
        <Route path  = '/' exact component = {Home}/>
        <Route path = '/login' component = {SignInUser} />
        <Route path = "/register" component = {SignUp}/>
        <Route path = '/ManageEvent' component = {AddEvent}/>
      </Switch>
      </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

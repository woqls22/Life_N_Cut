import logo from "./logo.svg";
import "./App.css";
import HomeComponent from "./Component/HomeComponent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import LoginStore, { LoginInfoDO } from "./Stores/LoginStore";
import { useObserver } from "mobx-react";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from "./Component/Login";

function WelComePage(){
  return(
    <>
    <div className="App">
        <HomeComponent />
      </div>
    </>
  );
}
function App() {
  return useObserver(() => {
    return (
      <Router>
        <Route path='/' exact component={WelComePage} /> 
        <Route path='/login' component={Login} /> 
      </Router>
    );
  });
}

export default App;

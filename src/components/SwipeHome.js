import React from "react"
import { NavBar } from "./nav/NavBar"
import { Footer } from "./footer/Footer"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Route, Redirect } from "react-router-dom"
import { UserProvider } from "./user/UserProvider"
import { MessageProvider } from "./chat/MessageProvider"
import "./SwipeHome.css"

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#663399'
    },
    secondary: {
      main: '#ffc107',  
    },
  },
});

export const SwipeHome = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("swipeHome_user")) {
          return (
            <>
            
              <MessageProvider>
                <NavBar />
              
                <ApplicationViews/>
                
              </MessageProvider>
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      {/* <NavBar /> */}
      <Login />
    </Route>
    <Route path="/register">
      {/* <NavBar /> */}
      <Register />
    </Route>
  </>
)

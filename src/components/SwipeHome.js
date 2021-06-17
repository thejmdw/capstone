import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Route, Redirect } from "react-router-dom"
 
export const SwipeHome = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("swipeHome_user")) {
          return (
            <>
              
              <NavBar />
              <ApplicationViews />
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

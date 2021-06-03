import React from "react"
import { Link, useHistory } from "react-router-dom"
import PersonIcon from "@material-ui/icons/Person"
import HomeIcon from '@material-ui/icons/Home';
import "./NavBar.css"

export const NavBar = () => {

  const history = useHistory()

  return (

    <div className="navbar">
      NavBar
      <HomeIcon fontSize="large" />
      <PersonIcon fontSize="large"/>
    </div>
  )
}
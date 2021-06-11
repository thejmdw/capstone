import React from "react"
import { Link, useHistory } from "react-router-dom"
import PersonIcon from "@material-ui/icons/Person"
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton"
import "./NavBar.css"

export const NavBar = () => {

  const history = useHistory()

  return (

    <div className="navbar">
      <Link className="navbar__link" to="/search">
        <IconButton>
          <SearchIcon fontSize="large" />
        </IconButton>
      </Link>
      <Link className="navbar__link" to="/houseList">
        <IconButton>
          <HomeWorkIcon fontSize="large" />
        </IconButton>
      </Link>
      <Link className="navbar__link" to="/profile">
        <IconButton>
          <PersonIcon fontSize="large"/>
        </IconButton>
      </Link>
    </div>
  )
}
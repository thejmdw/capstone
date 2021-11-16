import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import PersonIcon from "@material-ui/icons/Person"
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from "@material-ui/core/IconButton"
import { Badge, Button, Menu, MenuItem } from '@material-ui/core';
import "./NavBar.css"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { MessageContext } from "../chat/MessageProvider";
import { Logo } from "./swipeHomeLogo"

export const NavBar = () => {
  const currentUser = localStorage.getItem("swipeHome_user")
  const { getUnreadMessagesByUserId, unreadMessages, setUnreadMessages } = useContext(MessageContext)

  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  const [anchorEl, setAnchorEl] = useState(null);
  // const [ unreadMessages, setUnreadMessages ] = useState({})

  useEffect(() => {
    getUnreadMessagesByUserId(currentUser)
    .then((data) => { setUnreadMessages(data) })
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  return (

    <div className="navbar">
      {/* <Link className="navbar__link" to="/search"> */}
      <div>
        <IconButton className="navbarButtons" onClick={goBack}>
          <ArrowBackIosIcon  />
        </IconButton>
        {/* <Link className="navbar__link" to="/search"> */}
        <IconButton className="navbarButtonGone">
          <SearchIcon  />
        </IconButton>
      {/* </Link> */}
        </div>
      {/* </Link> */}
      {/* <Link className="navbar__link" to="/search">
        <IconButton className="navbarButtons">
          <SearchIcon  />
        </IconButton>
      </Link> */}
      <Link className="navbar__link" to="/">
        <IconButton className="navbarButtons navbar_center">
          <Logo className="navbarLogo" />
          {/* <HomeWorkIcon  /> */}
        </IconButton>
      </Link>
      <div>
      <Link className="navbar__link" to="/messages">
        <IconButton className="navbarButtons navbar_end">
          <Badge badgeContent={unreadMessages.length} color="secondary">
            <MessageIcon  />
          </Badge>
        </IconButton>
      </Link>
      
      <Link className="navbar__link" to="/profile">
        <IconButton className="navbarButtons navbar_end">
          <PersonIcon />
        </IconButton>
      </Link>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Messages</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </div> */}
      </div>
    </div>
  )
}

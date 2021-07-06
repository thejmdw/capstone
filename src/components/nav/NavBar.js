import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import PersonIcon from "@material-ui/icons/Person"
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from "@material-ui/core/IconButton"
import Badge from '@material-ui/core/Badge';
import "./NavBar.css"
import { MessageContext } from "../chat/MessageProvider";

export const NavBar = () => {
  const currentUser = localStorage.getItem("swipeHome_user")
  const { getUnreadMessagesByUserId, unreadMessages, setUnreadMessages } = useContext(MessageContext)

  const history = useHistory()
  // const [ unreadMessages, setUnreadMessages ] = useState({})

  useEffect(() => {
    getUnreadMessagesByUserId(currentUser)
    .then((data) => { setUnreadMessages(data) })
  }, [])
  

  return (

    <div className="navbar">
      <Link className="navbar__link" to="/search">
        <IconButton className="navbarButtons">
          <SearchIcon fontSize="large" />
        </IconButton>
      </Link>
      <Link className="navbar__link" to="/">
        <IconButton className="navbarButtons">
          <HomeWorkIcon fontSize="large" />
        </IconButton>
      </Link>
      <Link className="navbar__link" to="/messages">
        <IconButton className="navbarButtons">
          <Badge badgeContent={unreadMessages.length} color="secondary">
            <MessageIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Link>
      <Link className="navbar__link" to="/profile">
        <IconButton className="navbarButtons">
          <PersonIcon fontSize="large"/>
        </IconButton>
      </Link>
    </div>
  )
}
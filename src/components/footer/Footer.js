import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PersonIcon from "@material-ui/icons/Person"
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from "@material-ui/core/IconButton"
import Badge from '@material-ui/core/Badge';
import "./Footer.css"
import { MessageContext } from "../chat/MessageProvider";

export const Footer = () => {
  const currentUser = localStorage.getItem("swipeHome_user")
  const { getUnreadMessagesByUserId, unreadMessages, setUnreadMessages } = useContext(MessageContext)

  
  // const [ unreadMessages, setUnreadMessages ] = useState({})
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  useEffect(() => {
    getUnreadMessagesByUserId(currentUser)
    .then((data) => { setUnreadMessages(data) })
  }, [])
  

  return (

    <div className="footer">
      <Link className="footer__link" to="/search">
        <IconButton className="FooterButtons" onClick={goBack}>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
      </Link>
    </div>
  )
}
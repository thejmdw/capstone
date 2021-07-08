import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import "./Chat.css"
import TinderCard from "react-tinder-card"
import { Buttons } from "../buttons/Buttons"
import { UserContext } from "../user/UserProvider"
import { IconButton, Input } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar } from "@material-ui/core";
import { TextField } from "@material-ui/core";


export const Chat = () => {
  const { addMessage, markUserMessagesRead, getMessagesByUserIdAndSenderId, removeMessage,sentMessages, receivedMessages, markUserMessagesUnread } = useContext(MessageContext)
  const { recipient, getUserById, getRecipientById, getSenderById } = useContext(UserContext)
  
  const currentUserId = parseInt(localStorage.getItem("swipeHome_user"))
  const senderId = parseInt(localStorage.getItem("sender_id"))
  const history = useHistory()
  const [ sender, setSender ] = useState({})
  // const [ messagesBySender, setMessagesBySender ] = useState([])
  // const [ sender, setSender ] = useState({})
  // const [ currentUser, setCurrentUser ] = useState({})

  const [ messageSent, setMessageSent ] = useState()
  const [ messages, setMessages ] = useState([])
  const [ filteredMessages, setFilteredMessages ] = useState([])
  const [ message, setMessage ] = useState({
    userId: parseInt(localStorage.getItem("swipeHome_user")),
    recipientId: senderId
  })


  useEffect(() => {
    getMessagesByUserIdAndSenderId(currentUserId, senderId)
    .then((data) => {setMessages(data)})
    
  }, [])

  useEffect(() => {
    getUserById(senderId)
    .then((data) => {setSender(data)})
    
  }, [])

  useEffect(() => {
    const filtered = messages?.filter(message => (message.userId === senderId && message.recipientId === currentUserId) || (message.userId === currentUserId && message.recipientId === senderId) )
    filtered?.sort((s1, s2) => (s1.id > s2.id ? 1 : -1))
    setFilteredMessages(filtered)
    const messagesToUser = []
    for (const message of filtered) {
      if (message.recipientId === currentUserId) {
        messagesToUser.push(message)
      }
    }
    markUserMessagesRead(messagesToUser)
  }, [sender, messages])


  // useEffect(() => {
  //   getMessagesByUserIdAndRecipientId(currentUserId, senderId)
  //     .then(() => {getMessagesByRecipientIdAndUserId(currentUserId, senderId)})
  //     .then(() => {getRecipientById(senderId)})
  //     .then(() => {getSenderById(currentUserId)})
  // }, [])
  useEffect(() => {
    // debugger
    getMessagesByUserIdAndSenderId(currentUserId, senderId)
      .then(data => {setMessages(data)})
  }, [messageSent])

  const handleSendMessage = () => {
    // getMessageDetail(property_id)
    message.timestamp = Date.now()
    message.unread = true
    // message.recipientId = senderId
    addMessage(message)
    .then(setMessageSent)
    // .then(() => {getMessagesByUserIdAndRecipientId(currentUserId, senderId)})
    // .then(() => {getMessagesByRecipientIdAndUserId(currentUserId, senderId)})
    // .then(() => {getRecipientById(sender.id)})
    // .then(() => {getSenderById(currentUserId)})
    // .then(() => {history.push(`/chat`)})
    // history.push(`/chat`)
    setMessage({text: ""})
  }

  const handleDeleteMessage = (messageId) => {
      removeMessage(messageId)
      .then(setMessageSent)
  }



  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state. */
    const newMessage = { ...message }
    /* message is an object with properties.
    Set the property to the new value 
    using Object Bracket Notation. */
    newMessage[event.target.id] = event.target.value
    //Update State
    // console.log(newMessage)
    setMessage(newMessage)
  }

  // debugger
  console.log(sender)
  // const filteredMessages = messages?.filter(message => (message.userId === senderId && message.recipientId === currentUserId) || (message.userId === currentUserId && message.recipientId === senderId) )
  //   filteredMessages?.sort((s1, s2) => (s1.id > s2.id ? 1 : -1))
    // markUserMessagesUnread(filteredMessages)
  return (
    <>
      <section className="chatCards__container">
          <h3>Your conversation with {sender?.name}</h3>
          <div className="chatCard">
          {filteredMessages?.map(message => {
            return (
              <div className="chatMessage" key={message.timestamp} >
                
                  {message.userId === parseInt(localStorage.getItem("swipeHome_user")) ? 
                  <>
                  <div className="chatFlexEnd">
                    <div className="chatFlex end">
                      <div>
                        <div className="chatFlexMessage end endPadding">
                      <h5 className="chatFlex end chatMessageText">{message.text}</h5>
                          <div className="chatFlexMessageTime chatMessageColor">
                          <IconButton className="buttonPadding" onClick={() => {handleDeleteMessage(message.id)}}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          <h6 className=" chatFlex end">
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.timestamp)}
                          </h6>
                          </div>
                        </div>
                      </div>
                      <Avatar alt="user profile" src={message.user.avatarURL} />
                      {/* <img className="chatCard__img" src={message.user.avatarURL} alt="profile"/> */}
                    </div>
                    
                  </div></> : 
                  <>
                  <div className="chatFlexStart">
                    <div className="chatFlex">
                      <Avatar alt="user profile" src={message.user.avatarURL} />
                        {/* <img className="chatCard__img" src={message.user.avatarURL} alt="profile"/> */}
                      <div className="chatFlexMessage startPadding">
                      <h5 className="chatMessageText">{message.text}</h5>
                      <div className="chatFlexMessageTime chatMessageColor end">
                        <h6>
                          {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.timestamp)}
                        </h6>
                        <IconButton className="buttonPadding" onClick={() => {handleDeleteMessage(message.id)}}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        </div>
                      </div>
                    </div>
                  </div></>
                  } 
                </div>
                
                
                )
              })}
              </div>

      <div className="messageForm__Container">
        <form className="messageForm">
          
          {/* <div className="messageForm_inputs"> */}
            {/* <fieldset> */}
             
                {/* <label htmlFor="message">Message</label> */}
                <Input margin="dense" className="messageForm-control" type="text" id="text" required  placeholder="message" value={message.text} onChange={handleControlledInputChange} onKeyPress={(ev) => {
    console.log(`Pressed keyCode ${ev.key}`);
    if (ev.key === 'Enter') {
      // Do code here
      ev.preventDefault();
      handleSendMessage()
    }
  }}/>
              
            {/* </fieldset> */}
          
          <Button className="sendBtn "
              
              // disabled={isLoading}
              onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleSendMessage()
                
              }}>
                <SendIcon />
          </Button>
          {/* </div> */}
        </form>    
      </div>       
          
      </section>
      {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
    </>
  )
}



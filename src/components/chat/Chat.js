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
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from '@material-ui/icons/Delete';


export const Chat = () => {
  const { sentMessages, receivedMessages, markUserMessagesUnread, addMessage, getMessagesByUserIdAndSenderId, removeMessage} = useContext(MessageContext)
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
  const [ message, setMessage ] = useState({
    userId: parseInt(localStorage.getItem("swipeHome_user")),
    recipientId: senderId
  })


  useEffect(() => {
    getMessagesByUserIdAndSenderId(currentUserId, senderId)
    .then((data) => {setMessages(data)})
    .then(() => {getUserById(senderId)})
    .then((data) => {setSender(data)})
    // .then(() => {
      
    // })
  }, [])



  // useEffect(() => {
  //   getMessagesByUserIdAndRecipientId(currentUserId, senderId)
  //     .then(() => {getMessagesByRecipientIdAndUserId(currentUserId, senderId)})
  //     .then(() => {getRecipientById(senderId)})
  //     .then(() => {getSenderById(currentUserId)})
  // }, [])
  useEffect(() => {
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
  const filteredMessages = messages?.filter(message => (message.userId === senderId && message.recipientId === currentUserId) || (message.userId === currentUserId && message.recipientId === senderId) )
    filteredMessages?.sort((s1, s2) => (s1.id > s2.id ? 1 : -1))
    // markUserMessagesUnread(filteredMessages)
  return (
    <>
      <section className="chatCards__container">
          <h3>Your conversation with {sender?.name}</h3>
          {filteredMessages?.map(message => {
            return (
              <div className="chatCard" key={message.timestamp} >
              <div>
                
                  {message.userId === parseInt(localStorage.getItem("swipeHome_user")) ? 
                  <>
                  <div className="chatFlexEnd">
                    <div className="chatFlex end">
                      <h5>{message.text}</h5>
                      <img className="chatCard__img" src={message.user.avatarURL} alt="profile"/>
                    </div>
                    <div className="chatFlex end">
                      <IconButton onClick={() => {handleDeleteMessage(message.id)}}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <h6 className=" chatFlex end endPadding">
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.timestamp)}
                      </h6>
                   </div>
                  </div></> : 
                  <>
                  <div className="chatFlexStart">
                    <div className="chatFlex">
                      <img className="chatCard__img" src={message.user.avatarURL} alt="profile"/>
                      <h5>{message.text}</h5>
                    </div>
                    <div className="chatFlex">
                      <h6 className="startPadding">
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.timestamp)}
                      </h6>
                      <IconButton onClick={() => {handleDeleteMessage(message.id)}}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div></>
                  } 
                </div>
              </div>
                

            )
          })}

      <div className="messageForm__Container">
        <form className="messageForm">
          <div >
          {/* <div className="messageForm_inputs"> */}
            {/* <fieldset> */}
              <div>
                {/* <label htmlFor="message">Message</label> */}
                <input type="text" id="text" required className="messageForm-control" placeholder="message" value={message.text} onChange={handleControlledInputChange} />
              </div>
            {/* </fieldset> */}
          </div>
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



import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import "./Chat.css"
import TinderCard from "react-tinder-card"
import { Buttons } from "../buttons/Buttons"
import { UserContext } from "../user/UserProvider"
import Avatar from '@material-ui/core/Avatar';

export const ChatList = () => {
  const { getMessagesByRecipientId, receivedMessages, getMessagesByUserIdAndRecipientId, getMessagesByRecipientIdAndUserId } = useContext(MessageContext)
  const { getRecipientById, getSenderById } = useContext(UserContext)
  const history = useHistory()
  // const [ messagesBySender, setMessagesBySender ] = useState([])

  useEffect(() => {
    getMessagesByRecipientId(localStorage.getItem("swipeHome_user"))
      
  }, [])

  const handleMessageClick = (userId, recipientId) => {
    // debugger
      // getMessagesByUserIdAndRecipientId(userId, recipientId)
      // .then(() => {getMessagesByRecipientIdAndUserId(userId, recipientId)})
      // .then(() => {getRecipientById(recipientId)})
      // .then(() => {getSenderById(userId)})
      // .then(() => {localStorage.setItem("sender_id", userId)})
      // .then(() => {history.push(`/chat`)})
      localStorage.setItem("sender_id", userId)
      history.push(`/chat`)
  }

  // console.log(receivedMessages)

  const senders = []
  const messagesBySender = []
  receivedMessages.sort((s1, s2) => (s1.id < s2.id ? 1 : -1))
    receivedMessages.forEach((message) => {
      // debugger
      if (!senders.includes(message.user.id)) {
        senders.push(message.user.id)
        messagesBySender.push({
          userId: message.user.id,
          recipientId: message.recipientId,
          avatarURL: message.user.avatarURL,
          name: message.user.name,
          text: message.text,
          timestamp: message.timestamp
        })
      }
    })
  

  return (
    <>
      <section className="chatCards__container">
      
          {messagesBySender.length === 0 ? <div className="chatCard">You don't have any messages!</div> : 
            messagesBySender.map(message => {
            return (
              <div className="chatCard" key={message.timestamp} onClick={() => {handleMessageClick(message.userId, message.recipientId)}}>
              <div className="chatFlexMessage">
                <div className="chatFlex">
                <Avatar alt="user profile" src={message.avatarURL} />
                  {/* // <img className="chatCard__img" src={message.avatarURL} alt="profile"/> */}
                  <div className="chatMessagePadding">
                    <h3>{message.name}</h3>
                    <div className="chatMessageColor">{message.text}</div>
                  </div>
                </div>
                <h6 className="chatMessageColor">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(message.timestamp)}</h6>
              </div>
                
                  
            </div> 
            )
          })}
                       
             
      </section>
      {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
    </>
  )
}



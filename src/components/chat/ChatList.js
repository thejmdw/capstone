import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import "./Chat.css"
import TinderCard from "react-tinder-card"
import { Buttons } from "../buttons/Buttons"

export const ChatList = () => {
  const { sentMessages, getMessagesByUserId, removeMessage, getMessagesByRecipientId, receivedMessages } = useContext(MessageContext)
  
  const history = useHistory()

  useEffect(() => {
    getMessagesByUserId(localStorage.getItem("swipeHome_user"))
      .then(() => {getMessagesByRecipientId(localStorage.getItem("swipeHome_user"))})
  }, [])

  const handleMessageClick = (id, property_id) => {
    // getMessageDetail(property_id)
    // .then(() => history.push(`/messages/detail/${id}`))
  }

  console.log(receivedMessages)
  return (
    <>
      <section className="chatCards__container">
      
          {receivedMessages.map(message => {
            return (
              <div className="chatCard" >
              <div>
                <div className="chatFlex">
                  <img className="chatCard__img" src={message.user.avatarURL} alt="profile"/>
                  <div>
                    <h3>{message.user.name}</h3>
                    {message.text}
                  </div>
                </div>
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.timestamp)
}
              </div>
                
                  
            </div> 
            )
          })}
                       
             
      </section>
      {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
    </>
  )
}



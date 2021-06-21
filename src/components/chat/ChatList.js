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
      
          
            <div className="chatCard" >
              
                
                  
            </div>            
             
      </section>
      {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
    </>
  )
}



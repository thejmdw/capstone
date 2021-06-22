import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import "./Chat.css"
import TinderCard from "react-tinder-card"
import { Buttons } from "../buttons/Buttons"

export const Chat = () => {
  const { sentMessages, receivedMessages } = useContext(MessageContext)
  
  const history = useHistory()
  // const [ messagesBySender, setMessagesBySender ] = useState([])

  // useEffect(() => {
  //   getMessagesByRecipientId(localStorage.getItem("swipeHome_user"))
      
  // }, [])

  const handleMessageClick = (id, property_id) => {
    // getMessageDetail(property_id)
    history.push(`/chat`)
  }

  // console.log(receivedMessages)

//   const senders = []
//   const messagesBySender = []
//   receivedMessages.sort((s1, s2) => (s1.id < s2.id ? 1 : -1))
//     receivedMessages.forEach((message) => {
//       // debugger
//       if (!senders.includes(message.user.id)) {
//         senders.push(message.user.id)
//         messagesBySender.push({
//           userId: message.user.id,
//           avatarURL: message.user.avatarURL,
//           name: message.user.name,
//           text: message.text,
//           timestamp: message.timestamp
//         })
//       }
//     })

// console.log(senders)

  const messages = sentMessages.concat(receivedMessages)
  console.log(messages)
    messages.sort((s1, s2) => (s1.id > s2.id ? 1 : -1))
  return (
    <>
      <section className="chatCards__container">
      
          {messages.map(message => {
            return (
              <div className="chatCard" key={message.timestamp} onClick={handleMessageClick}>
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



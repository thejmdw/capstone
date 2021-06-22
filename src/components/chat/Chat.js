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

export const Chat = () => {
  const { sentMessages, receivedMessages } = useContext(MessageContext)
  const { recipient, sender } = useContext(UserContext)
  
  const history = useHistory()
  // const [ messagesBySender, setMessagesBySender ] = useState([])

  // useEffect(() => {
  //   getMessagesByRecipientId(localStorage.getItem("swipeHome_user"))
      
  // }, [])
  const [ message, setMessage ] = useState({
    userId: parseInt(localStorage.getItem("swipeHome_user")),
    
  })

  const handleMessageClick = (id, property_id) => {
    // getMessageDetail(property_id)
    history.push(`/chat`)
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

  const messages = sentMessages.concat(receivedMessages)
  console.log(messages)
    messages.sort((s1, s2) => (s1.id > s2.id ? 1 : -1))
  return (
    <>
      <section className="chatCards__container">
          <h3>Your conversation with {sender.name}</h3>
          {messages.map(message => {
            return (
              <div className="chatCard" key={message.timestamp} onClick={handleMessageClick}>
              <div>
                
                  {message.userId === parseInt(localStorage.getItem("swipeHome_user")) ? 
                  <>
                  <div className="chatFlexEnd">
                    <div className="chatFlex end">
                      <h5>{message.text}</h5>
                      <img className="chatCard__img" src={message.user.avatarURL} alt="profile"/>
                    </div>
                  
                  <h6 className=" chatFlex end endPadding">
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.timestamp)
    }             </h6>
                  </div></> : 
                  <>
                  <div className="chatFlexStart">
                    <div className="chatFlex">
                      <img className="chatCard__img" src={message.user.avatarURL} alt="profile"/>
                      <h5>{message.text}</h5>
                    </div>
                    <h6 className="startPadding">
                      {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.timestamp)
      }             </h6>
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
                <input type="text" id="message" required className="messageForm-control" placeholder="message" value={message.text} onChange={handleControlledInputChange} />
              </div>
            {/* </fieldset> */}
          </div>
          <Button className="sendBtn "
              
              // disabled={isLoading}
              onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                // handleClickSendMessage()
                
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



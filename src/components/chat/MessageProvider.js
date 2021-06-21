import React, { createContext, useState } from 'react'

export const MessageContext = createContext()

export const MessageProvider = (props) => {
  const [ message, setMessage ] = useState({})
  const [ sentMessages, setSentMessages ] = useState([])
  const [ receivedMessages, setReceivedMessages ] = useState([])

  const addMessage = (messageObj) => {
    return fetch(`http://localhost:8088/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObj)
    })
    .then(setMessage(messageObj))
  }

  const getMessagesByUserId = (userId) => {
      return fetch(`http://localhost:8088/messages?userId=${userId}`)
      .then(res => res.json())
      .then(data => setSentMessages(data))
  }
  const getMessagesByRecipientId = (userId) => {
      return fetch(`http://localhost:8088/messages?recipientId=${userId}&_expand=user`)
      .then(res => res.json())
      .then(data => setReceivedMessages(data))
  }

  const removeMessage = messageId => {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "DELETE"
    })
  }

  return (
    <MessageContext.Provider value ={
      {
        message, sentMessages, receivedMessages, addMessage, getMessagesByUserId, getMessagesByRecipientId, removeMessage
      }
    }>
      {props.children}
    </MessageContext.Provider>
  )
}

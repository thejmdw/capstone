import React, { createContext, useState } from 'react'

export const MessageContext = createContext()

export const MessageProvider = (props) => {
  const [ message, setMessage ] = useState({})
  const [ messages, setMessages ] =useState([])
  const [ sentMessages, setSentMessages ] = useState([])
  const [ receivedMessages, setReceivedMessages ] = useState([])
  const [ unreadMessages, setUnreadMessages ] = useState([])

  const addMessage = (messageObj) => {
    return fetch(`http://localhost:8088/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObj)
    })
    .then(setSentMessages(messageObj))
  }
  const markMessageUnread = (messageObj) => {
    return fetch(`http://localhost:8088/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObj)
    })
    // .then(setSentMessages(messageObj))
  }

  const getMessagesByUserIdAndSenderId= (userId, senderId) => {
      return fetch(`http://localhost:8088/messages?_sort=userId,recipientId&_order=${senderId},${userId}&_expand=user`)
      .then(res => res.json())
      // .then(data => setSentMessages(data))
  }
  const getMessagesByRecipientId = (recipientId) => {
    return fetch(`http://localhost:8088/messages?recipientId=${recipientId}&_expand=user`)
    .then(res => res.json())
    .then(data => setReceivedMessages(data))
  }
  
  const getMessagesByUserIdAndRecipientId = (recipientId, userId) => {
      return fetch(`http://localhost:8088/messages?userId=${recipientId}&recipientId=${userId}&_expand=user`)
      .then(res => res.json())
      .then(data => setReceivedMessages(data))
  }
  const getMessagesByRecipientIdAndUserId = (userId, recipientId) => {
      return fetch(`http://localhost:8088/messages?recipientId=${userId}&userId=${recipientId}&_expand=user`)
      .then(res => res.json())
      .then(data => setMessages(data))
  }

  const getUnreadMessagesByUserId = (userId) => {
    return fetch(`http://localhost:8088/messages?recipientId=${userId}&unread=false`)
    .then(res => res.json())
    // .then(data => setUnreadMessages(data))
  }
  
  const removeMessage = messageId => {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "DELETE"
    })
  }

  return (
    <MessageContext.Provider value ={
      {
        message, messages, 
        sentMessages, receivedMessages, 
        addMessage, getMessagesByUserIdAndSenderId, 
        getMessagesByRecipientId, 
        getMessagesByUserIdAndRecipientId, 
        getMessagesByRecipientIdAndUserId,
        setSentMessages,
        removeMessage,
        unreadMessages,
        getUnreadMessagesByUserId
      }
    }>
      {props.children}
    </MessageContext.Provider>
  )
}

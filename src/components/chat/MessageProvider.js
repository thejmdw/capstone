import React, { createContext, useState } from 'react'

export const MessageContext = createContext()

export const MessageProvider = (props) => {
  const [ message, setMessage ] = useState({})
  const [ messages, setMessages ] =useState([])
  const [ sentMessages, setSentMessages ] = useState([])
  const [ receivedMessages, setReceivedMessages ] = useState([])
  const [ readUserMessages, setReadUserMessages ] = useState([])
  const [ unreadMessages, setUnreadMessages ] = useState([])
  const currentUser = localStorage.getItem("swipeHome_user")

  const addMessage = (messageObj) => {
    // debugger
    return fetch(`https://swipe-home.herokuapp.com/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObj)
    })
    .then(setSentMessages(messageObj))
  }
  
  const getMessagesByUserIdAndSenderId= (userId, senderId) => {
    return fetch(`https://swipe-home.herokuapp.com/messages?_sort=userId,recipientId&_order=${senderId},${userId}&_expand=user`)
    .then(res => res.json())
    // .then(data => setSentMessages(data))
  }
  const getMessagesByRecipientId = (recipientId) => {
    return fetch(`https://swipe-home.herokuapp.com/messages?recipientId=${recipientId}&_expand=user`)
    .then(res => res.json())
    .then(data => setReceivedMessages(data))
  }
  
  const getMessagesByUserIdAndRecipientId = (recipientId, userId) => {
    return fetch(`https://swipe-home.herokuapp.com/messages?userId=${recipientId}&recipientId=${userId}&_expand=user`)
    .then(res => res.json())
    .then(data => setReceivedMessages(data))
  }
  const getMessagesByRecipientIdAndUserId = (userId, recipientId) => {
    return fetch(`https://swipe-home.herokuapp.com/messages?recipientId=${userId}&userId=${recipientId}&_expand=user`)
    .then(res => res.json())
    .then(data => setMessages(data))
  }
  
  const getUnreadMessagesByUserId = (userId) => {
    return fetch(`https://swipe-home.herokuapp.com/messages?recipientId=${userId}&unread=true`)
    .then(res => res.json())
    // .then(data => setUnreadMessages(data))
  }
  
  const removeMessage = messageId => {
    return fetch(`https://swipe-home.herokuapp.com/messages/${messageId}`, {
      method: "DELETE"
    })
  }
  
  const markUserMessagesRead = (messageArray) => {
    // debugger
    messageArray.forEach((messageObj) => {
    const messObjCopy = {...messageObj}
    messObjCopy.unread = false
    return fetch(`https://swipe-home.herokuapp.com/messages/${messageObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messObjCopy)
    })
    .then(getUnreadMessagesByUserId(currentUser))
    .then((data) => { setUnreadMessages(data) })
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
        readUserMessages,
        getUnreadMessagesByUserId,
        markUserMessagesRead,
        unreadMessages,
        setUnreadMessages
      }
    }>
      {props.children}
    </MessageContext.Provider>
  )
}

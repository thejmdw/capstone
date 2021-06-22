import React from "react"
import { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [ users, setUsers ] = useState([])
  const [ user, setUser ] = useState({})
  const [ recipient, setRecipient] = useState({})
  const [ sender, setSender ] = useState({})

  

  const getUsers = () => {
    return fetch(`http://localhost:8088/users?_embed=userType`)
    .then(response => 
      response.json()
    )    
    .then(data =>
      setUsers(data))
    .catch(err => {
      console.error(err);
    })
  }

  const getSenderById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    })
    .then(response => 
      response.json()
    )
    .then(data => setSender(data))
  }
  const getRecipientById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    })
    .then(response => 
      response.json()
    )
    .then(data => setRecipient(data))
  }
  const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    })
    .then(response => 
      response.json()
    )
  }

  const updateUser = userObj => {
    return fetch(`http://localhost:8088/users/${userObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
    })
    .then(getUsers)
  }

  return (
    <UserContext.Provider value ={
      {
        user, users, getUsers, getUserById, updateUser, recipient, sender, getRecipientById, getSenderById
      }
    }>
      {props.children}
    </UserContext.Provider>
  )
}
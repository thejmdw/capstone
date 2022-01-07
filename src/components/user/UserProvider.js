import React from "react"
import { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [ users, setUsers ] = useState([])
  const [ user, setUser ] = useState({})
  const [ recipient, setRecipient] = useState({})
  const [ sender, setSender ] = useState({})

  

  const getUsers = () => {
    return fetch(`https://swipehome-d73a6-default-rtdb.firebaseio.com/users?_embed=userType`)
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
    return fetch(`https://swipehome-d73a6-default-rtdb.firebaseio.com/users/${userId}`, {
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
    return fetch(`https://swipehome-d73a6-default-rtdb.firebaseio.com/users/${userId}`, {
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
    return fetch(`https://swipehome-d73a6-default-rtdb.firebaseio.com/users/${userId}`, {
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
    return fetch(`https://swipehome-d73a6-default-rtdb.firebaseio.com/users/${userObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
    })
    .then(getUsers)
  }

  const putAvatarURL = (userObj, avatarURL, id) => {
    userObj.avatarURL = avatarURL
    return fetch(`https://swipehome-d73a6-default-rtdb.firebaseio.com/users/${id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
      })
      .then(getUsers)
      .catch(err => console.log(err))
      }


  const uploadUserAvatar = (dataObj, data, id) => {
    return fetch("https://api.cloudinary.com/v1_1/thejmdw/image/upload",{
      method:"POST",
      body: data
      })
      .then(resp => resp.json())
      .then(data => {putAvatarURL(dataObj, data.secure_url, id)}) //-----PATCH USER avatarURL 
      }
  

  return (
    <UserContext.Provider value ={
      {
        user, users, getUsers, getUserById, updateUser, recipient, sender, getRecipientById, getSenderById, uploadUserAvatar, putAvatarURL
      }
    }>
      {props.children}
    </UserContext.Provider>
  )
}
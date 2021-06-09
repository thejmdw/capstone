import React from "react"
import { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
  const [ users, setUsers ] = useState([])
  const [ user, setUser ] = useState({})

  const getUsers = () => {
    return fetch(`https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=Nashville&state_code=TN&limit=20&offset=0&sort=relevance&postal_code=37207&beds_min=0&allows_dog=true&price_max=3000`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "bc293e4707msh4961366c18bcffep125e04jsnfbdb172d68a0",
        "x-rapidapi-host": "realtor.p.rapidapi.com"
      }
    })
    .then(response => 
      response.json()
    )    
    .then(data =>
      setUsers(data.properties))
    .catch(err => {
      console.error(err);
    })
  }

  const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users?id=${userId}`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    })
    .then(response => 
      response.json()
    )    
    .then(data =>
      setUser(data[0]))
    .catch(err => {
      console.error(err);
    })
  }

  return (
    <UserContext.Provider value ={
      {
        user, users, getUsers, getUserById
      }
    }>
      {props.children}
    </UserContext.Provider>
  )
}
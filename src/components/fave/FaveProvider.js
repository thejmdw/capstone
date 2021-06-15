import React, { createContext, useState } from 'react'

export const FaveContext = createContext()

export const FaveProvider = (props) => {
  const [ fave, setFave ] = useState({})
  const [ faves, setFaves ] = useState([])
  // const [houses, setHouses] = useState([])

  const addFave = (faveObj) => {
    // debugger
    return fetch(`http://localhost:8088/faves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(faveObj)
    })
    .then(setFave(faveObj))
  }

  const getFavesByUserId = (userId) => {
      return fetch(`http://localhost:8088/faves?userId=${userId}`)
      .then(res => res.json())
      .then(data => setFaves(data))
  }

  const removeFave = faveId => {
    return fetch(`http://localhost:8088/faves/${faveId}`, {
      method: "DELETE"
    })
    // .then(getEmployees)
  }

  

  return (
    <FaveContext.Provider value ={
      {
        fave, faves, addFave, getFavesByUserId, removeFave
      }
    }>
      {props.children}
    </FaveContext.Provider>
  )
}

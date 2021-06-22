import React, { createContext, useState } from 'react'

export const FaveContext = createContext()

export const FaveProvider = (props) => {
  const [ fave, setFave ] = useState({})
  const [ faves, setFaves ] = useState([])
  const [ faveDetail, setFaveDetail ] = useState({})


  const addFave = (faveObj) => {
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
  }

  const getFaveById = faveId => {
    return fetch(`http://localhost:8088/faves/${faveId}`)
    .then(res => res.json())
    // .then(setFave)
  }

  const getFaveDetail = (property_id) => {
    return fetch(`https://realty-in-us.p.rapidapi.com/properties/v2/detail?property_id=${property_id.replace(/"/g,"")}`, {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-key": "bc293e4707msh4961366c18bcffep125e04jsnfbdb172d68a0",
		    "x-rapidapi-host": "realty-in-us.p.rapidapi.com"
	    }
    })
    .then(response => response.json())
    .then(data => data.properties[0])
    // .then(data => localStorage.setItem("fave", JSON.stringify(data.properties[0])))
    .catch(err => {console.error(err)})
  }

  

  return (
    <FaveContext.Provider value ={
      {
        fave, faves, addFave, getFavesByUserId, removeFave, faveDetail, getFaveDetail, getFaveById
      }
    }>
      {props.children}
    </FaveContext.Provider>
  )
}

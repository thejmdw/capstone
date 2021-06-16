import React, { createContext, useState } from 'react'

export const FaveContext = createContext()

export const FaveProvider = (props) => {
  const [ fave, setFave ] = useState({})
  const [ faves, setFaves ] = useState([])
  const [ favesDetailList, setFavesDetailList] = useState([])


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

  // const getFaveDetails = (property_id) => {
  //   fetch(`https://realty-in-us.p.rapidapi.com/properties/v2/detail?property_id=${property_id.replace(/"/g,"")}`, {
	//     "method": "GET",
	//     "headers": {
	// 	    "x-rapidapi-key": "bc293e4707msh4961366c18bcffep125e04jsnfbdb172d68a0",
	// 	    "x-rapidapi-host": "realty-in-us.p.rapidapi.com"
	//     }
  //   })
  //   .then(response => response.json())
  //   .then(data => favesDetailList.push(data.properties))
  //   .catch(err => {console.error(err)})
  // }

  

  return (
    <FaveContext.Provider value ={
      {
        fave, faves, addFave, getFavesByUserId, removeFave, favesDetailList
      }
    }>
      {props.children}
    </FaveContext.Provider>
  )
}

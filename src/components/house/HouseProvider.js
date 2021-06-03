import React from "react"
import { useState, createContext } from "react"

export const HouseContext = createContext()

export const HouseProvider = (props) => {
  const [ houses, setHouses ] = useState([])

  const getHouses = () => {
    return fetch("https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=St%20Elmo&state_code=TN&limit=10&offset=0&sort=relevance&postal_code=37409", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "bc293e4707msh4961366c18bcffep125e04jsnfbdb172d68a0",
        "x-rapidapi-host": "realtor.p.rapidapi.com"
      }
    })
    .then(response => {
      console.log(response);
      response.json()
    })
    .then(data => setHouses(data.properties))
    .catch(err => {
      console.error(err);
    })
  }

  return (
    <HouseContext.Provider value ={
      {
        houses, getHouses
      }
    }>
      {props.children}
    </HouseContext.Provider>
  )
} 
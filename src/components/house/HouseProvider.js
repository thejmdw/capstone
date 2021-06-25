import React from "react"
import axios from "axios";
import { useState, createContext } from "react"

export const HouseContext = createContext()

export const HouseProvider = (props) => {
  const [ houses, setHouses ] = useState([])
  const [ listing, setListing ] = useState({})

  const getHousesTest = () => {
    return fetch(`https://realty-in-us.p.rapidapi.com/properties/v2/list-for-rent?city=Nashville&state_code=TN&limit=20&offset=0&sort=relevance&postal_code=37207&beds_min=0&allows_dog=true&price_max=3000`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "bc293e4707msh4961366c18bcffep125e04jsnfbdb172d68a0",
        "x-rapidapi-host": "realty-in-us.p.rapidapi.com"
      }
    })
    .then(response => 
      response.json()
    )    
    .then(data =>
      setHouses(data.properties))
    .catch(err => {
      console.error(err);
    })
  }

  const addListing = (listingObj) => {
    debugger
    return fetch(`http://localhost:8088/houses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listingObj)
    })
  }

  const getHouseById = houseId => {
    return fetch(`http://localhost:8088/houses/${houseId}?_expand=user`)
    .then(res => res.json())
  }


  return (
    <HouseContext.Provider value ={
      {
        houses, getHousesTest, addListing, getHouseById
      }
    }>
      {props.children}
    </HouseContext.Provider>
  )
} 
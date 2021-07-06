import React from "react"
import axios from "axios";
import { useState, createContext } from "react"

export const HouseContext = createContext()

export const HouseProvider = (props) => {
  const [ houses, setHouses ] = useState([])
  const [ listing, setListing ] = useState({})
  const [ listings, setListings ] = useState([])

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
    // debugger
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

  // const putListingPicURL = (userObj, avatarURL, id) => {
  //   userObj.avatarURL = avatarURL
  //   return fetch(`http://localhost:8088/users/${id}`,{
  //     method:"PUT",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(userObj)
  //     })
  //     // .then(getUsers)
  //     .catch(err => console.log(err))
  //     }
  
  const uploadListingPic = (data) => {
    return fetch("https://api.cloudinary.com/v1_1/thejmdw/image/upload",{
      method:"POST",
      body: data
      })
      .then(resp => resp.json())
      // .then(data => data.secure_url) //-----PATCH USER avatarURL 
      }
  

  const getListingsByUserId = userId => {
    return axios.get(`http://localhost:8088/houses?userId=${userId}`)
    .then((res) => res.data)
    .then(data => setListings(data))
  }

  return (
    <HouseContext.Provider value ={
      {
        houses, listings, getHousesTest, addListing, getHouseById, uploadListingPic, getListingsByUserId
      }
    }>
      {props.children}
    </HouseContext.Provider>
  )
} 
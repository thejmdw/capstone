import React from "react"
import axios from "axios";
import { useState, createContext } from "react"

export const HouseContext = createContext()

export const HouseProvider = (props) => {
  const [ houses, setHouses ] = useState([])

  const getHouses = () => {
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
      setHouses(data.properties))
    .catch(err => {
      console.error(err);
    })
  }


  // const options = {
  //   method: 'GET',
  //   url: 'https://realtor.p.rapidapi.com/properties/v2/list-for-rent',
  //   params: {
  //     city: 'St Elmo',
  //     state_code: 'TN',
  //     limit: '200',
  //     offset: '0',
  //     sort: 'relevance'
  //   },
  //   headers: {
  //     'x-rapidapi-key': 'bc293e4707msh4961366c18bcffep125e04jsnfbdb172d68a0',
  //     'x-rapidapi-host': 'realtor.p.rapidapi.com'
  //   }
  // };

  // axios.request(options)
  //   .then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });

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
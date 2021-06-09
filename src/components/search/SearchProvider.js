import React, { createContext, useState } from 'react'

export const SearchContext = createContext()

export const SearchProvider = (props) => {
  const [ search, setSearch ] = useState()

  const postSearchToLocal = (searchArray) => {
    return fetch(`http://localhost:8088/searches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchArray)
    })
  }

  const getSearch = (query) => {
    return fetch(`https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=${query.city}&state_code=${query.state_code}&limit=200&offset=0&sort=relevance&postal_code=${query.postal_code}&baths_min=${query.baths_min}&beds_min=${query.beds_min}&price_max=${query.priceMax}&allows_dogs=${query.allows_dogs}`, {
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
      postSearchToLocal(data.properties))
    .catch(err => {
      console.error(err);
    })
  }

  return (
    <SearchContext.Provider value ={
      {
        search, getSearch, postSearchToLocal
      }
    }>
      {props.children}
    </SearchContext.Provider>
  )
}

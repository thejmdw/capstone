import React, { createContext, useState } from 'react'

export const SearchContext = createContext()

export const SearchProvider = (props) => {
  const [ search, setSearch ] = useState()

  const postSearchToLocal = (searchObj) => {
    return fetch(`http://localhost:8088/searches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchObj)
    })
    .then(getSearch(searchObj))
  }

  const getSearch = (searchObj) => {
    return fetch(`https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=${searchObj.city}&state_code=${searchObj.state_code}&limit=200&offset=0&sort=relevance&postal_code=${searchObj.postal_code}&baths_min=${searchObj.baths_min}&beds_min=${searchObj.beds_min}&price_max=${searchObj.priceMax}&allows_dogs=${searchObj.allows_dogs}`, {
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
      setSearch(data.properties))
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

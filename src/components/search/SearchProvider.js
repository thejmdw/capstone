import React, { createContext, useState } from 'react'

export const SearchContext = createContext()

export const SearchProvider = (props) => {
  const [ search, setSearch ] = useState({})
  const [ searches, setSearches ] = useState([])
  const [houses, setHouses] = useState([])

  const addSearch = (searchObj) => {
    return fetch(`http://localhost:8088/searches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchObj)
    })
    .then(setSearch)
  }

  const getSearches = () => {
      return fetch(`http://localhost:8088/searches`)
      .then(res => res.json())
      .then(data => setSearches(data.properties))
  }

  const getHouses = (search) => {
    return fetch(`https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=${search.city.replace(/"/g,"")}&state_code=${search.state_code.replace(/"/g,"")}&limit=200&offset=0&sort=relevance&postal_code=${search.postal_code.replace(/"/g,"")}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "bc293e4707msh4961366c18bcffep125e04jsnfbdb172d68a0",
        "x-rapidapi-host": "realtor.p.rapidapi.com"
      }
    })
    .then(response => response.json())    
    .then(data => setHouses(data.properties))
    .catch(err => {console.error(err)})
  }

  return (
    <SearchContext.Provider value ={
      {
        search, searches, addSearch, getSearches, houses, getHouses, 
      }
    }>
      {props.children}
    </SearchContext.Provider>
  )
}

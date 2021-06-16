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

  const deleteSearch = (searchId)=> {
    return fetch(`http://localhost:8088/searches/${searchId}`, {
      method: "DELETE"
    })
  }

  const getSearchesByUserId = (userId) => {
      return fetch(`http://localhost:8088/searches?userId=${userId}`)
      .then(res => res.json())
      .then(data => setSearches(data))
  }

  const getHouses = (search) => {
    debugger
    
    return fetch(`https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=${search.city.replace(/"/g,"")}&state_code=${search.state_code.replace(/"/g,"")}&limit=200&offset=0&sort=relevance${search.postal_code ? `&postal_code=${search.postal_code.replace(/"/g,"")}` : "" }${search.price_max ? `&price_max=${search.price_max.replace(/"/g,"")}` : "" }${search.beds_min ? `&beds_min=${search.beds_min.replace(/"/g,"")}` : "" }${search.baths_min ? `&baths_min=${search.baths_min.replace(/"/g,"")}` : "" }${search.allows_dogs === "true" ? `&allows_dogs=true` : "&allows_dogs=false" }${search.allows_cats === "true" ? `&allows_cats=true` : "&allows_cats=true" }`, {
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
        search, searches, addSearch, getSearchesByUserId, houses, getHouses, deleteSearch
      }
    }>
      {props.children}
    </SearchContext.Provider>
  )
}

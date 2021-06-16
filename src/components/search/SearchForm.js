import React, { useContext, useEffect } from 'react'
import { SearchContext } from "./SearchProvider"
import { useState, createContext } from "react"
import { stateCodes } from './stateCodes'
import "./Search.css"
import { useHistory } from 'react-router'

// export const SearchContext = createContext()

export const SearchForm = () => {
  const { getSearch, addSearch, getHouses } = useContext(SearchContext)
  const history = useHistory()

  const [ search, setSearch ] = useState({
    userId: parseInt(localStorage.getItem("swipeHome_user")),
    allows_dogs: "true"
  })

  // useEffect(() => {
  //   setSearch()
  // }, [])
 

  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state. */
    const newSearch = { ...search }
    /* search is an object with properties.
    Set the property to the new value 
    using Object Bracket Notation. */
    newSearch[event.target.id] = event.target.value
    //Update State
    setSearch(newSearch)
  }

  const handleClickSaveSearch = e => {
    // e.preventDefault() 

    if (search.city === "" || search.state_code === 0 ) {
      window.alert("Please select a city and state")
    } else {
        addSearch(search)
        getHouses(search)
          .then(() => history.push("/houseList"))
    }
  }
  
  return (
    <div className="searchForm__Container">
      <form className="searchForm">
      <h2 className="searchForm__title">Search</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" required autoFocus className="form-control" placeholder="City" value={search.city} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">State:</label>
          <select name="state_mode" required id="state_code" className="form-control" value={search.state_code} onChange={handleControlledInputChange}>
            <option value="0">Select</option>
            {stateCodes.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="PostalCode">Zip Code:</label>
          <input type="num" id="postal_code" className="form-control" placeholder="5 Digit Postal Code" value={search.postal_code} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="priceMax">Max Price:</label>
          <input type="num" id="price_max" className="form-control" placeholder="$" value={search.price_max} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="beds_min">Beds Min:</label>
          <select name="beds_min" id="beds_min" className="form-control" value={search.beds_min} onChange={handleControlledInputChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="baths_min">Baths Min:</label>
          <select name="baths_min" id="baths_min" className="form-control" value={search.baths_min} onChange={handleControlledInputChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="stateCode">Allows Dogs</label>
          <input type="radio" id="allows_dogs" className="form-control" value={search.allows_dogs = "true"} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary"
          // disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveSearch()
            
          }}>
          Submit Search</button>
    </form>
    </div>
  )
}

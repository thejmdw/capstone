import React from 'react'
import { useState, useContext, useEffect } from "react"
import { SearchContext } from "./SearchProvider"
import { UserContext } from "../user/UserProvider"
import { stateCodes } from './stateCodes'
import "./Search.css"
import { useHistory } from 'react-router'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button, Input, Select, FormControlLabel, Radio, MenuItem, InputLabel } from '@material-ui/core'

export const SearchForm = () => {
  const { addSearch, getHousesForRent, getHousesForSale, getLocalHousesRent, getLocalHousesSale } = useContext(SearchContext)
  const { getUserById } = useContext(UserContext)
  const history = useHistory()

  const [ search, setSearch ] = useState({
    userId: parseInt(localStorage.getItem("swipeHome_user")),
    
  })

  const [ loading, setLoading ] = useState(false)

  const [ user, setUser ] = useState({})
  const currentUser = user
  console.log(currentUser)

  useEffect(() => {
      getUserById(parseInt(localStorage.getItem("swipeHome_user")))
        .then(user => setUser(user))
  }, [])
 
  

  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state. */
    const newSearch = { ...search }
    /* search is an object with properties.
    Set the property to the new value 
    using Object Bracket Notation. */
    newSearch[event.target.id] = event.target.value
    //Update State
    console.log(newSearch)
    setSearch(newSearch)
  }
  const handleControlledStateChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state. */
    const newSearch = { ...search }
    /* search is an object with properties.
    Set the property to the new value 
    using Object Bracket Notation. */
    newSearch.state_code = event.target.value
    //Update State
    console.log(newSearch)
    setSearch(newSearch)
  }

  const handleControlledInputChangeCheck = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state. */
    const newSearch = { ...search }
    /* search is an object with properties.
    Set the property to the new value 
    using Object Bracket Notation. */
    if (newSearch.allows_dogs) {
      newSearch.allows_dogs = false
    } else if (!newSearch.allows_dogs){
      newSearch.allows_dogs = true
    } else {
    newSearch[event.target.id] = event.target.value
    }
    //Update State
    setSearch(newSearch)
  }
  const handleControlledRadioChange = e => {
    const newSearch = { ...search }
    newSearch.userTypeId = e.target.value
    setUser(newSearch)
  }

  const handleClickSaveSearch = e => {
    // e.preventDefault()
    // search.userTypeId = currentUser.userTypeId
    console.log(search)
    search.city = search.city.toLowerCase()
    if (search.city === undefined || search.state_code === undefined ) {
      window.alert("Please select a city and state")
      } else if (parseInt(currentUser.userTypeId) === 1) {
        search.userTypeId = parseInt(currentUser.userTypeId)
        addSearch(search)
        getHousesForRent(search)
        .then(getLocalHousesRent(search))
          .then(() => history.push("/searchResultsList"))
      } else if (parseInt(currentUser.userTypeId) === 2) {
        search.userTypeId = parseInt(currentUser.userTypeId)
          addSearch(search)
          getHousesForSale(search)
          .then(() => {getLocalHousesSale(search)})
            .then(() => history.push("/searchResultsList"))
      }
    }
  // debugger
  return (
    <div className="searchForm__Container">
      <form className="searchForm">
      <h2 className="searchForm__title">Search</h2>
      <div className="searchForm_inputs">
        <fieldset>
          <div className="form-group">
            <label htmlFor="city"></label>
            <Input type="text" id="city" required autoFocus className="SearchForm-control" placeholder="City" value={search?.city} autoComplete onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group-select">
            <InputLabel htmlFor="location">State:</InputLabel>
            <Select name="state_mode" required id="state_code" className="SearchForm-control SearchFormDropDown-control" value={search?.state_code} onChange={handleControlledStateChange} required>
              
              {stateCodes.map(s => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </div>
        </fieldset>
        
        

        <fieldset>
          <div className="form-group">
            <label htmlFor="PostalCode"></label>
            <Input type="num" id="postal_code" className="SearchForm-control" placeholder="Zip Code" value={search?.postal_code} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="priceMax"></label>
            <Input type="num" id="price_max" className="SearchForm-control" placeholder="Max Price $" value={search?.price_max} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group-select">
            <InputLabel htmlFor="beds_min">Beds Min:</InputLabel>
            <Select name="beds_min" id="beds_min" className="SearchForm-control SearchFormDropDown-control" value={search?.beds_min} onChange={handleControlledInputChange}>
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3+</MenuItem>
            </Select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group-select">
            <InputLabel htmlFor="baths_min">Baths Min:</InputLabel>
            <Select name="baths_min" id="baths_min" className="SearchForm-control SearchFormDropDown-control" value={search?.baths_min} onChange={handleControlledInputChange}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3+</MenuItem>
            </Select>
          </div>
        </fieldset>
        <fieldset className="inputRadio">
            <div className="radios">
                <FormControlLabel className="radio" id="userTypeId"  value="1" checked={parseInt(user.userTypeId) === 1 ? true : false} control={<Radio />} label="Renter" onChange={handleControlledRadioChange} />
                <FormControlLabel className="radio" id="userTypeId"  value="2" checked={parseInt(user.userTypeId) === 2 ? true : false } control={<Radio />} label="Buyer" onChange={handleControlledRadioChange} />
                {/* <FormControlLabel className="radio" id="userTypeId"  value="3" checked={parseInt(user.userTypeId) === 3 ? true : false} control={<Radio />} label="Agent" onChange={handleControlledRadioChange} /> */}
                </div>
          </fieldset>
      </div>
      <Button color="primary" variant="contained" className="btn btn-primary"
          // disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveSearch()
            setLoading(true)
          }}>
          Submit Search</Button>
    </form>
    </div>
  )
}

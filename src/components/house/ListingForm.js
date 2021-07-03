import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { AnimalProvider } from "../animal/AnimalProvider"
import { stateCodes } from '../search/stateCodes'
import { UserContext } from "../user/UserProvider"
import { HouseContext } from "./HouseProvider"
import { Button, Input, Select, MenuItem, InputLabel } from "@material-ui/core"
import { FormControlLabel, Radio } from "@material-ui/core"
import "../user/User.css"

export const ListingForm = () => {
  const { updateUser, getUserById } = useContext(UserContext)
  const { addListing, uploadListingPic } = useContext(HouseContext)
  const [ isLoading, setIsLoading ] = useState(true)
  const userId = localStorage.getItem("swipeHome_user")
  const history = useHistory()
  const [user, setUser] = useState({})
  const [house, setHouse] = useState({
    address: {
      line: "",
      city: "",
      state_code: "",
      postal_code: ""    
    },
    price: 0,
    beds: 0,
    photos: [],
    baths_full: 0,
    userTypeId: 0,
    userId: userId
  })
  const [pic, setPic] =useState({
    file: "",
  })
  

  const handleControlledInputChange = e => {
    setIsLoading(false)
    const newHouse = { ...house }
    newHouse[e.target.id] = e.target.value
    setHouse(newHouse)
  }
  const handleControlledStateChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state. */
    const newHouse = { ...house }
    /* search is an object with properties.
    Set the property to the new value 
    using Object Bracket Notation. */
    newHouse.state_code = event.target.value
    //Update State
    console.log(newHouse)
    setHouse(newHouse)
  }
  const handleControlledPicChange = e => {
    const newPic = { ...pic }
    newPic[e.target.id] = e.target.files
    console.log(newPic.file[0])
    setPic(newPic)
  }
  const handleControlledRadioChange = e => {
    const newHouse = { ...house }
    newHouse.userTypeId = e.target.value
    setHouse(newHouse)
  }

  const handleAdd = (e) => {
    setIsLoading(true)
    // debugger
    let newHouse = {
      address: {
        line: house.address,
        city: house.city,
        state_code: house.state_code,
        postal_code: house.postal_code
      },
      photos: [],
      price: parseInt(house.price),
      beds: parseInt(house.beds),
      baths_full: parseInt(house.baths_full),
      userTypeId: parseInt(house.userTypeId),
      userId: parseInt(userId)
    }
    const data = new FormData()
    data.append("file", pic.file[0])
    data.append("upload_preset", "swipeHome")
    
    uploadListingPic(data)
    .then((data) => newHouse.photos.push({href: data.secure_url}))

    .then(() => addListing(newHouse))
        .then(() => history.push(`/profile`))    
  }

  return (
    <div className="userForm__container">
    <form className="userForm">
      <h2 className="userForm__title">Add Listing</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <Input type="text" id="address" required autoFocus className="form-control" placeholder="Address" value={house.address.line} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <Input type="text" id="city" required className="form-control" placeholder="City" value={house.address.city} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
          <div className="form-group">
            <InputLabel htmlFor="location">State:</InputLabel>
            <Select name="state_mode" required id="state_code" className="SearchForm-control SearchFormDropDown-control" value={house.state_code} onChange={handleControlledStateChange}>
              {/* <option value="0">Select</option> */}
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
            <label htmlFor="PostalCode">Zip Code:</label>
            <Input type="num" id="postal_code" className="SearchForm-control" placeholder="5 Digit Postal Code" value={house.address.postal_code} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <Input type="num" id="price" className="SearchForm-control" placeholder="$" value={house.price} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="beds">Bedrooms:</label>
          <Input type="num" id="beds" className="SearchForm-control" placeholder="0" value={house.beds} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="baths_full">Full Baths:</label>
          <Input type="num" id="baths_full" className="SearchForm-control" placeholder="0" value={house.baths_full} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          {/* <label htmlFor="avatarUrl">Upload Picture:</label> */}
          <Button color="secondary" size="small" variant="contained" component="label">
          <input type="file" id="file" required autoFocus className="form-control" 
                placeholder="file" 
                onChange={handleControlledPicChange} />
          </Button>
        </div>
        {/* <button className="btn btn-primary"
          // disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            // uploadImage()
          }}>Upload image</button> */}
      </fieldset>
      {/* <fieldset>
        <div className="form-group">
          <label htmlFor="avatarURL">Picture URL:</label>
          <input type="text" id="avatarURL" required autoFocus className="form-control" placeholder="Picture URL" value={house.avatarURL} onChange={handleControlledInputChange} />
        </div>
      </fieldset> */}
      <fieldset>
        {/* <div className="form-group">
          <label htmlFor="userTypeId">For Rent:</label>
          <input type="radio" id="userTypeId" className="form-control" checked={parseInt(house.userTypeId) === 1 ? true : false} value="1" onChange={handleControlledInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="userTypeId">For Sale:</label>
          <input type="radio" id="userTypeId" className="form-control" checked={parseInt(house.userTypeId) === 2 ? true : false } value="2" onChange={handleControlledInputChange} />
        </div> */}
        <div className="radios">
                <FormControlLabel className="radio" id="userTypeId"  value="1" checked={parseInt(house.userTypeId) === 1 ? true : false} control={<Radio />} label="For Rent" onChange={handleControlledRadioChange} />
                <FormControlLabel className="radio" id="userTypeId"  value="2" checked={parseInt(house.userTypeId) === 2 ? true : false } control={<Radio />} label="For Sale" onChange={handleControlledRadioChange} />
                </div>
      </fieldset>
      <Button variant="contained" color="primary" className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleAdd()
          }}>
          Add Listing
      </Button>
      <Button variant="contained" color="primary" className="btn btn-primary"
          disabled={isLoading}
          onClick={() => history.push(`/profile`)}>
          Go Back
      </Button>
    </form>
    </div>
  )
}
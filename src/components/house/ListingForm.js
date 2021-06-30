import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { AnimalProvider } from "../animal/AnimalProvider"
import { stateCodes } from '../search/stateCodes'
import { UserContext } from "../user/UserProvider"
import { HouseContext } from "./HouseProvider"
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
  const handleControlledPicChange = e => {
    const newPic = { ...pic }
    newPic[e.target.id] = e.target.files
    console.log(newPic.file[0])
    setPic(newPic)
  }

  const handleAdd = (e) => {
    setIsLoading(true)
    debugger
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
          <input type="text" id="address" required autoFocus className="form-control" placeholder="Address" value={house.address.line} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" required autoFocus className="form-control" placeholder="City" value={house.address.city} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
          <div className="form-group">
            <label htmlFor="location">State:</label>
            <select name="state_mode" required id="state_code" className="SearchForm-control SearchFormDropDown-control" value={house.address.state_code} onChange={handleControlledInputChange}>
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
            <input type="num" id="postal_code" className="SearchForm-control" placeholder="5 Digit Postal Code" value={house.address.postal_code} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="num" id="price" className="SearchForm-control" placeholder="$" value={house.price} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="beds">Bedrooms:</label>
          <input type="num" id="beds" className="SearchForm-control" placeholder="0" value={house.beds} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="baths_full">Full Baths:</label>
          <input type="num" id="baths_full" className="SearchForm-control" placeholder="0" value={house.baths_full} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="avatarUrl">Upload Picture:</label>
          <input type="file" id="file" required autoFocus className="form-control" placeholder="file" onChange={handleControlledPicChange} />
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
        <div className="form-group">
          <label htmlFor="userTypeId">For Rent:</label>
          <input type="radio" id="userTypeId" className="form-control" checked={parseInt(house.userTypeId) === 1 ? true : false} value="1" onChange={handleControlledInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="userTypeId">For Sale:</label>
          <input type="radio" id="userTypeId" className="form-control" checked={parseInt(house.userTypeId) === 2 ? true : false } value="2" onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleAdd()
          }}>
          Add Listing
      </button>
      <button className="btn btn-primary"
          disabled={isLoading}
          onClick={() => history.push(`/profile`)}>
          Go Back
      </button>
    </form>
    </div>
  )
}
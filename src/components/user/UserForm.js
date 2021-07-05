import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { AnimalProvider } from "../animal/AnimalProvider"
import { UserContext } from "../user/UserProvider"
import { Button, Input } from "@material-ui/core"
import "./User.css"
import { FormControlLabel, Radio } from "@material-ui/core"

export const UserForm = () => {
  const { updateUser, getUserById, uploadUserAvatar, putAvatarURL } = useContext(UserContext)
  const [ isLoading, setIsLoading ] = useState(true)
  const { userId } = useParams()
  const history = useHistory()
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatarURL: "",
    userTypeId: 0
  })
  const [pic, setPic] =useState({
    file: "",
  })

  useEffect(() => {
    if (userId) {
      getUserById(parseInt(userId))
      .then(user => {
        setUser(user)
        setIsLoading(false)
      })
      } else {
      setIsLoading(false)
    }}, [])

  const handleControlledInputChange = e => {
    const newUser = { ...user }
    newUser[e.target.id] = e.target.value
    setUser(newUser)
  }
  const handleControlledRadioChange = e => {
    const newUser = { ...user }
    newUser.userTypeId = e.target.value
    setUser(newUser)
  }
  const handleControlledPicChange = e => {
    const newPic = { ...pic }
    newPic[e.target.id] = e.target.files
    console.log(newPic.file)
    setPic(newPic)
  }

  const handleUpdate = (e) => {
    setIsLoading(true)
      const editedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        userTypeId: parseInt(user.userTypeId)
      }
      updateUser(editedUser)
      .then(() => history.push(`/profile`))
    
  }

  const uploadImage = event => {
    const data = new FormData()
    data.append("file", pic.file[0])
    data.append("upload_preset", "swipeHome")

    uploadUserAvatar({...user}, data, parseInt(userId))
      .then(() => history.push("/profile"))
}


  return (
    <>
    <div className="userFormFlex userCard__container">
      <div className="userCard">
      <div className="userUpload__container">
        <h2 className="userForm__title">Edit Profile</h2>
        <form>
          <fieldset className="userForm-group">
            <div className="center">
              <img src={user.avatarURL} alt="user" className="userProfile_avatar"></img>
              <div className="buttons2">
              <div className="uploadButton centerButton">
                <Button  color="secondary" size="small" variant="contained" component="label">
                  Choose Image
                  <input id="file" type="file" onChange={handleControlledPicChange} hidden/>
                </Button>
              </div>
              <div className="uploadButton">
                <Button size="small" className="uploadButton centerButton" variant="contained" color="primary" className="btn btn-primary"
                    // disabled={isLoading}
                  onClick={event => {
                  event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                  uploadImage()
                  }}>Upload image
                </Button>
              </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="userForm__container">
        <form >
          <fieldset className="userForm-group2">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <Input type="text" id="name" required autoFocus className="form-control" placeholder="Name" value={user.name} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <fieldset className="userForm-group2">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Input type="email" id="email" required autoFocus className="form-control" placeholder="Email" value={user.email} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          <fieldset className="userForm-group2">
            <div className="form-group">
              <label htmlFor="avatarURL">Avatar URL:</label>
              <Input type="text" id="avatarURL" required autoFocus className="form-control" placeholder="Avatar URL" value={user.avatarURL} onChange={handleControlledInputChange} />
            </div>
          </fieldset>
          
          <fieldset className="userForm-group2">
            {/* <div className="form-group">
              <label htmlFor="userTypeId">Renter:</label>
              <input type="radio" id="userTypeId" className="form-control" checked={parseInt(user.userTypeId) === 1 ? true : false} value="1" onChange={handleControlledInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="userTypeId">Buyer:</label>
              <input type="radio" id="userTypeId" className="form-control" checked={parseInt(user.userTypeId) === 2 ? true : false } value="2" onChange={handleControlledInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="userTypeId">Agent:</label>
              <input type="radio" id="userTypeId" className="form-control" checked={parseInt(user.userTypeId) === 3 ? true : false} value="3" onChange={handleControlledInputChange} />
            </div> */}
            <div className="radios">
                <FormControlLabel className="radio" id="userTypeId"  value="1" checked={parseInt(user.userTypeId) === 1 ? true : false} control={<Radio />} label="Renter" onChange={handleControlledRadioChange} />
                <FormControlLabel className="radio" id="userTypeId"  value="2" checked={parseInt(user.userTypeId) === 2 ? true : false } control={<Radio />} label="Buyer" onChange={handleControlledRadioChange} />
                <FormControlLabel className="radio" id="userTypeId"  value="3" checked={parseInt(user.userTypeId) === 3 ? true : false} control={<Radio />} label="Agent" onChange={handleControlledRadioChange} />
                </div>
          </fieldset>
          <div className="userButtons" >
          <Button variant="contained" color="secondary" className="btn btn-primary"
              disabled={isLoading}
              onClick={() => history.push(`/profile`)}>
              Go Back
          </Button>
          <Button variant="contained" color="primary" className="btn btn-primary"
              disabled={isLoading}
              onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleUpdate()
              }}>
              Update user
          </Button>
          </div>
        </form>
      </div>
      </div>
    </div>
    </>
  )
}
import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { AnimalProvider } from "../animal/AnimalProvider"
import { UserContext } from "../user/UserProvider"
import "./User.css"

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
    return fetch("https://api.cloudinary.com/v1_1/thejmdw/image/upload",
    {
        method: "POST",
        body: data
    })

    .then(response =>response.json())
    .then(data => putAvatarURL({...user}, data.secure_url, parseInt(userId)))
    .then(() => history.push("/profile"))
}


  return (
    <>
    <div className="userForm__container">
    <h2 className="userForm__title">Edit Profile</h2>
      <form>
      <fieldset>
        <div className="form-group">
          <img src={user.avatarURL} alt="user"></img>
          <input type="file" id="file" required autoFocus className="form-control" placeholder="file" onChange={handleControlledPicChange} />
        </div>
        <button className="btn btn-primary"
          // disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            uploadImage()
          }}>Upload image</button>
      </fieldset>
      </form>
    </div>
    <div className="userForm__container">
    <form className="userForm">
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Name" value={user.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required autoFocus className="form-control" placeholder="Email" value={user.email} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="avatarURL">Avatar URL:</label>
          <input type="text" id="avatarURL" required autoFocus className="form-control" placeholder="Avatar URL" value={user.avatarURL} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      
      <fieldset>
        <div className="form-group">
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
        </div>
      </fieldset>
      <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleUpdate()
          }}>
          Update user
      </button>
      <button className="btn btn-primary"
          disabled={isLoading}
          onClick={() => history.push(`/profile`)}>
          Go Back
      </button>
    </form>
    </div>
    </>
  )
}
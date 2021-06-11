import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
// import { AnimalProvider } from "../animal/AnimalProvider"
import { UserContext } from "../user/UserProvider"
import "./User.css"

export const UserForm = () => {
  const { updateUser, getUserById } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const { userId } = useParams()
  const history = useHistory()
  
  const [user, setUser] =useState({
    name: "",
    email: "",
    avatarURL: "",
    userTypeId: 0
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

  return (
    <form className="userForm">
      <h2 className="userForm__title">Edit user</h2>
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
      <fieldset>
      </fieldset>
      <fieldset>
      </fieldset>
      
      <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleUpdate()
          }}>
          Update user
      </button>
    </form>
  )
}
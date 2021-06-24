
import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./Home.css"
import Button from '@material-ui/core/Button';


export const Home = () => {
  
  const { getUserById } = useContext(UserContext)
  const history = useHistory()

  const [user, setUser] = useState({})
  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
      .then(user => setUser(user))
     
  }, [])

  const currentUser = user
  // debugger
  return (
    <> 
      <section className="homeCard__container">
            <div className='homeProfile_container' key={currentUser.id}>
              <div className="homeCard">
                <div className="homeCard__greeting">
                  <img className="homeCard__userAvatar" src={currentUser.avatarURL} alt="user_avatar" />
                  <div>
                    <h2>Welcome Back</h2>
                    <h3>{currentUser.name}!</h3>
                  </div>
                </div>
                <div>
                  <Button onClick={() => history.push("/search")}>New Search</Button>
                  {currentUser.userTypeId === 3 ? <Button onClick={() => history.push("/listing")}>Add Listing</Button> : ""}
                  <Button onClick={() => history.push("/faves")}>Faves</Button>
                </div>
              </div>
            </div>
      </section>
    </>
  )
}
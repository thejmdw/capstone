
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./Home.css"
import TinderCard from "react-tinder-card"
import Button from '@material-ui/core/Button';


export const FirstTimeHome = () => {
  
  const { getUserById } = useContext(UserContext)
  const history = useHistory()

  const [user, setUser] = useState({})
  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
      .then(user => setUser(user))
     
  }, [])

  const currentUser = user

  return (
    <>
      
      
      <section className="homeCard__container">
            <div className='homeProfile_container' key={currentUser.id}>
              <div className="homeCard">
                <div className="homeCard__greeting">
                  <img className="homeCard__userAvatar" src={currentUser.avatarURL} alt="user_avatar" />
                  <div>
                    <h2>Welcome To SwipeHome!</h2>
                    <h3>{currentUser.name}</h3>
                    <p>Get started by searching first.</p>
                  </div>
                </div>
                
              <div>
                <Button onClick={() => history.push("/search")}>New Search</Button>
              </div>
              </div>
            </div>
      </section>
    </>
  )
}
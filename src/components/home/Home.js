
import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./Home.css"
import TinderCard from "react-tinder-card"
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
      
      
      <section className="userCard__container">
            <div className='userProfile_container' key={currentUser.id}>
              <div className="userCard">
                <h3>{currentUser.name}</h3>
                <h5>{currentUser.email}</h5>
              <div>
                <Button onClick={() => history.push("/search")}>New Search</Button>
                <Button onClick={() => history.push("/faves")}>Faves</Button>
              </div>
              </div>
            </div>
      </section>
    </>
  )
}
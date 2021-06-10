
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
// import "./User.css"
import TinderCard from "react-tinder-card"
import Button from '@material-ui/core/Button';


export const Home = () => {
  
  const { user, users, getUsers, getUserById, setUser } = useContext(UserContext)
  const currentUser = user
  const history = useHistory()

  
  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     
  }, [])

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
                <Button>Faves</Button>
              </div>
              </div>
            </div>
      </section>
    </>
  )
}
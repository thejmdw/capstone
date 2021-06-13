
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./User.css"
import TinderCard from "react-tinder-card"
import Button from '@material-ui/core/Button';
import { SearchContext } from "../search/SearchProvider"
import { FaveContext } from "../fave/FaveProvider"


export const User = () => {
  
  const { users, getUsers, getUserById } = useContext(UserContext)
  const { searches, getSearchesByUserId } = useContext(SearchContext)
  const { faves, getFavesByUserId } = useContext(FaveContext)
  // const [ matches, setMatches ] = useState(houses)
  const [lastDirection, setLastDirection] = useState()
  // let housesState = houses
  const [profile, setProfile] = useState({})

  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     .then(setProfile)
     .then(getSearchesByUserId(localStorage.getItem("swipeHome_user")))
     .then(getFavesByUserId(localStorage.getItem("swipeHome_user")))
  }, [])

  const currentUser = profile
  const currentUserSearches = searches
  const history =useHistory()

  const logOut = () => {
    localStorage.removeItem("swipeHome_user")
    history.push("/")
  }
  // debugger
  return (
    <>
      <section className="userCard__container">
            <div className='userProfile_container' key={currentUser.id}>
              <div className="userCard">
                <div className="userFlexItem test">
                  <div className="test">
                    <img src={currentUser.avatarURL} alt="user_avatar" />
                    <h3>{currentUser.name}</h3>
                    <h5>{currentUser.email}</h5>
                  </div>
                  <div className="test">
                    <div>{`Total Faves: ${faves.length}`}</div>
                    <Button onClick={() => {history.push("/faves")}}>Faves</Button>
                  </div>
                </div>
                <div className="test">
                  <div>Last 5 Searches</div>
                  {currentUserSearches.length === 0 ? <div>You Haven't Searched for Anything Yet</div> :
              
                  <div>{`${currentUserSearches[0].city},${currentUserSearches[0].state_code} ${currentUserSearches[0].postal_code}`}
                  </div>}
                </div>
                <div className="buttons">
                  <Button onClick={() => {history.push(`/profile/edit/${currentUser.id}`)}}>Edit Info</Button>
                  <Button onClick={logOut}>Log Out</Button>
                </div>
              </div>
            </div>
      </section>
    </>
  )
}


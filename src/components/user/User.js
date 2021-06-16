
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./User.css"
import TinderCard from "react-tinder-card"
import Button from '@material-ui/core/Button';
import { SearchContext } from "../search/SearchProvider"
import { FaveContext } from "../fave/FaveProvider"
import { ExposurePlus } from "@material-ui/icons"


export const User = () => {
  
  const { users, getUsers, getUserById } = useContext(UserContext)
  const { searches, getSearchesByUserId, deleteSearch, getHouses } = useContext(SearchContext)
  const { faves, getFavesByUserId } = useContext(FaveContext)
 
  const [lastDirection, setLastDirection] = useState()

  const [profile, setProfile] = useState({})

  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     .then(setProfile)
     .then(getSearchesByUserId(localStorage.getItem("swipeHome_user")))
     .then(getFavesByUserId(localStorage.getItem("swipeHome_user")))
  }, [])

  const currentUser = profile
  const currentUserSearches = searches.sort((s1, s2) => (s1.id < s2.id ? 1 : -1))
  const history = useHistory()
  const currentUserId = parseInt(localStorage.getItem("swipeHome_user"))

  const logOut = () => {
    localStorage.removeItem("swipeHome_user")
    history.push("/")
  }

  const removeSearch = (searchId, currentUserId) => {
    deleteSearch(searchId)
      .then(getSearchesByUserId(currentUserId))
  }
  
  const handleClickSearch = searchObj=> {
    // e.preventDefault() 

      getHouses(searchObj)
          .then(() => history.push("/searchList"))
    
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
                    {/* <div>{`Total Faves: ${faves.length}`}</div> */}
                    <Button onClick={() => {history.push("/faves")}}>Faves: {`${faves.length}`}</Button>
                    <Button onClick={() => {history.push("/searches")}}>Searches: {`${currentUserSearches.length}`}</Button>
                  </div>
                </div>
                <div className="test">
                  <div>Last 5 Searches</div>
                  {currentUserSearches.length === 0 ? <div>You Haven't Searched Yet</div> :
                  <div>
                  <div>{`1. ${currentUserSearches[0].city},${currentUserSearches[0].state_code} ${currentUserSearches[0].postal_code}`} <Button onClick={() => {removeSearch(currentUserSearches[0].id, currentUserId)}}>remove</Button></div>
                  <div>{currentUserSearches[1] ? <> 2.<Button onClick={() => {handleClickSearch(currentUserSearches[1])}}> {currentUserSearches[1].city},{currentUserSearches[1].state_code} {currentUserSearches[1].postal_code}</Button> <Button onClick={() => {removeSearch(currentUserSearches[1].id, currentUserId)}}>remove</Button> </> : `2.`}</div>
                  <div>{currentUserSearches[2] ? <> 3.<Button onClick={() => {handleClickSearch(currentUserSearches[2])}}> {currentUserSearches[2].city},{currentUserSearches[2].state_code} {currentUserSearches[2].postal_code}</Button> <Button onClick={() => {removeSearch(currentUserSearches[2].id, currentUserId)}}>remove</Button> </> : `3.`}</div>
                  <div>{currentUserSearches[3] ? <> 4.<Button onClick={() => {handleClickSearch(currentUserSearches[3])}}> {currentUserSearches[3].city},{currentUserSearches[3].state_code} {currentUserSearches[3].postal_code}</Button> <Button onClick={() => {removeSearch(currentUserSearches[3].id, currentUserId)}}>remove</Button> </> : `4.`}</div>
                  <div>{currentUserSearches[4] ? <> 5.<Button onClick={() => {handleClickSearch(currentUserSearches[4])}}> {currentUserSearches[4].city},{currentUserSearches[4].state_code} {currentUserSearches[4].postal_code}</Button> <Button onClick={() => {removeSearch(currentUserSearches[4].id, currentUserId)}}>remove</Button> </> : `5.`}</div>
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



import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./User.css"
import Button from '@material-ui/core/Button';
import { SearchContext } from "../search/SearchProvider"
import { FaveContext } from "../fave/FaveProvider"



export const User = () => {
  
  const { getUserById } = useContext(UserContext)
  const { searches, getSearchesByUserId, deleteSearch, getHouses } = useContext(SearchContext)
  const { faves, getFavesByUserId } = useContext(FaveContext)
 

  const [searchesListItems, setSearchesListItems] = useState()

  const [profile, setProfile] = useState({})

  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     .then(setProfile)
     .then(getSearchesByUserId(localStorage.getItem("swipeHome_user")))
     .then(getFavesByUserId(localStorage.getItem("swipeHome_user")))
  }, [])

  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     .then(setProfile)
     .then(getSearchesByUserId(localStorage.getItem("swipeHome_user")))
     .then(getFavesByUserId(localStorage.getItem("swipeHome_user")))
  },[searchesListItems])

  const currentUser = profile
  //    cus = currentUserSearches...
  const cus = searches.sort((s1, s2) => (s1.id < s2.id ? 1 : -1))
  //-------
  const history = useHistory()
  const currentUserId = parseInt(localStorage.getItem("swipeHome_user"))

  const logOut = () => {
    localStorage.removeItem("swipeHome_user")
    history.push("/")
  }

  const removeSearch = (searchId, currentUserId) => {
    deleteSearch(searchId)
      .then(setSearchesListItems)
  }
  
  const handleClickSearch = searchObj=> {
      getHouses(searchObj)
          .then(() => history.push("/searchResultsList"))
    
  }
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
                    <Button onClick={() => {history.push("/faves")}}>Faves: {`${faves.length}`}</Button>
                    <Button onClick={() => {history.push("/searches")}}>Searches: {`${cus.length}`}</Button>
                  </div>
                </div>
                <div className="test">
                  <div>Last 5 Searches</div>
                  {cus.length === 0 ? <div>You Haven't Searched Yet</div> :
                  <div>
                  <div>{<> 1. <Button onClick={() => {handleClickSearch(cus[0])}}> {cus[0].city},{cus[0].state_code} {cus[0].postal_code}</Button> <Button onClick={() => {removeSearch(cus[0].id, currentUserId)}}>remove</Button></>}</div>
                  <div>{cus[1] ? <> 2.<Button onClick={() => {handleClickSearch(cus[1])}}> {cus[1].city},{cus[1].state_code} {cus[1].postal_code}</Button> <Button onClick={() => {removeSearch(cus[1].id, currentUserId)}}>remove</Button> </> : `2.`}</div>
                  <div>{cus[2] ? <> 3.<Button onClick={() => {handleClickSearch(cus[2])}}> {cus[2].city},{cus[2].state_code} {cus[2].postal_code}</Button> <Button onClick={() => {removeSearch(cus[2].id, currentUserId)}}>remove</Button> </> : `3.`}</div>
                  <div>{cus[3] ? <> 4.<Button onClick={() => {handleClickSearch(cus[3])}}> {cus[3].city},{cus[3].state_code} {cus[3].postal_code}</Button> <Button onClick={() => {removeSearch(cus[3].id, currentUserId)}}>remove</Button> </> : `4.`}</div>
                  <div>{cus[4] ? <> 5.<Button onClick={() => {handleClickSearch(cus[4])}}> {cus[4].city},{cus[4].state_code} {cus[4].postal_code}</Button> <Button onClick={() => {removeSearch(cus[4].id, currentUserId)}}>remove</Button> </> : `5.`}</div>
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


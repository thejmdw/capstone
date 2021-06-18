
import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./Search.css"
import TinderCard from "react-tinder-card"
import Button from '@material-ui/core/Button';
import { SearchContext } from "../search/SearchProvider"
import { FaveContext } from "../fave/FaveProvider"



export const SearchList = () => {
  
  const { getUserById } = useContext(UserContext)
  const { searches, getSearchesByUserId, deleteSearch, getHouses } = useContext(SearchContext)
  const { getFavesByUserId } = useContext(FaveContext)
 

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
  //cus = currentUserSearches...
  const cus = searches.sort((s1, s2) => (s1.id < s2.id ? 1 : -1))
  //-------
  const history = useHistory()
  const currentUserId = parseInt(localStorage.getItem("swipeHome_user"))

  const removeSearch = (searchId, currentUserId) => {
    deleteSearch(searchId)
      .then(setSearchesListItems)
  }
  
  const handleClickSearch = searchObj=> {
   

      getHouses(searchObj)
          .then(() => history.push("/searchList"))
    
  }

  return (
    <>
      <section className="searchCard__container">
            <div className='searchProfile_container' key={currentUser.id}>
              <div className="searchCard">
                <div className="userFlexItem test">
                  <div className="test">
                    <img src={currentUser.avatarURL} alt="user_avatar" />
                    <h3>{currentUser.name}</h3>
                    <h5>{currentUser.email}</h5>
                  </div>
                </div>
                <div className="test">
                  <div>List Searches</div>
                  {cus.length === 0 ? <div>You Haven't Searched Yet</div> :
                    <div>{
                      cus.map((s) => {
                        return (
                          <>  <Button onClick={() => {handleClickSearch(s)}}> {s.city},{s.state_code} {s.postal_code}</Button> <Button onClick={() => {removeSearch(s.id, currentUserId)}}>remove</Button></>
                        )
                      })}</div>}
                </div>
                
              </div>
            </div>
      </section>
    </>
  )
}


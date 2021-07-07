
import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./User.css"
import { Button, IconButton } from '@material-ui/core';
import { SearchContext } from "../search/SearchProvider"
import { FaveContext } from "../fave/FaveProvider"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { HouseContext } from "../house/HouseProvider"



export const User = () => {
  
  const { getUserById } = useContext(UserContext)
  const { searches, getSearchesByUserId, deleteSearch, getHouses, getHousesForRent, getHousesForSale, getLocalHousesRent, getLocalHousesSale } = useContext(SearchContext)
  const { faves, getFavesByUserId } = useContext(FaveContext)
  const { listings, getListingsByUserId } = useContext(HouseContext)
  

  const [searchesListItems, setSearchesListItems] = useState()

  const [profile, setProfile] = useState({})

  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     .then(setProfile)
     .then(getListingsByUserId(localStorage.getItem("swipeHome_user")))
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
  
  // debugger
  const handleClickSearch = searchObj=> {
      if (searchObj.userTypeId === 1) {
        getHousesForRent(searchObj)
        .then(() => {getLocalHousesRent(searchObj)})
        .then(() => history.push("/searchResultsList"))
      } else if (searchObj.userTypeId === 2 ) {
        getHousesForSale(searchObj)
        .then(() => {getLocalHousesSale(searchObj)})
        .then(() => history.push("/searchResultsList"))
      }
    
  }
  return (
    <>
      <section className="userCard__container" key={currentUser.id}>
            
              <div className="userCard2">
                <div className="userFlexItem test">
                  <div className="userForm_columnFlex">
                    <img src={currentUser.avatarURL} alt="user_avatar" className="userProfile_avatar" />
                    <h3>{currentUser.name}</h3>
                    <h5>{currentUser.email}</h5>
                  </div>
                  <div className="userCard__statButtons">
                    <Button className="padding" variant="contained" color="secondary" onClick={() => {history.push("/faves")}}>Faves: {`${faves.length}`}</Button>
                    
                    {currentUser.userTypeId === 3 ? <Button className="padding" variant="contained" color="secondary" onClick={() => {history.push("/listings")}}>Listings: {`${listings.length}`}</Button> : ""}
                  </div>
                </div>
                <div className="userCard__searchList">
                  <h4>Past 5 Searches</h4>
                  {cus.length === 0 ? <div>You Haven't Searched Yet</div> :
                  <div>
                  <div>{<> <Button onClick={() => {handleClickSearch(cus[0])}}>1. {cus[0].city},{cus[0].state_code} {cus[0].postal_code}</Button> <IconButton className="deleteSearchButton" onClick={() => {removeSearch(cus[0].id, currentUserId)}}><DeleteForeverIcon/></IconButton></>}</div>
                  <div>{cus[1] ? <> <Button onClick={() => {handleClickSearch(cus[1])}}>2. {cus[1].city},{cus[1].state_code} {cus[1].postal_code}</Button> <IconButton className="deleteSearchButton" onClick={() => {removeSearch(cus[1].id, currentUserId)}}><DeleteForeverIcon/></IconButton> </> : ``}</div>
                  <div>{cus[2] ? <> <Button onClick={() => {handleClickSearch(cus[2])}}>3. {cus[2].city},{cus[2].state_code} {cus[2].postal_code}</Button> <IconButton className="deleteSearchButton" onClick={() => {removeSearch(cus[2].id, currentUserId)}}><DeleteForeverIcon/></IconButton> </> : ``}</div>
                  <div>{cus[3] ? <> <Button onClick={() => {handleClickSearch(cus[3])}}>4. {cus[3].city},{cus[3].state_code} {cus[3].postal_code}</Button> <IconButton className="deleteSearchButton" onClick={() => {removeSearch(cus[3].id, currentUserId)}}><DeleteForeverIcon/></IconButton> </> : ``}</div>
                  <div>{cus[4] ? <> <Button onClick={() => {handleClickSearch(cus[4])}}>5. {cus[4].city},{cus[4].state_code} {cus[4].postal_code}</Button> <IconButton className="deleteSearchButton" onClick={() => {removeSearch(cus[4].id, currentUserId)}}><DeleteForeverIcon/></IconButton> </> : ``}</div>
                  </div>}
                </div>
                <div className="userButtons">
                  <Button variant="contained" color="primary" onClick={() => {history.push(`/profile/edit/${currentUser.id}`)}}>Edit Info</Button>
                  <Button variant="contained" color="primary" onClick={logOut}>Log Out</Button>
                </div>
              </div>
           
      </section>
    </>
  )
}


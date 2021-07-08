
import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./House.css"
import { Button, IconButton } from '@material-ui/core';
import { SearchContext } from "../search/SearchProvider"
import { FaveContext } from "../fave/FaveProvider"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { HouseContext } from "../house/HouseProvider"
import EditIcon from '@material-ui/icons/Edit';



export const ListingList = () => {
  const { deleteListingById, getHouseById } = useContext(HouseContext)
  const { getUserById } = useContext(UserContext)
  const { getFaveById } = useContext(FaveContext)
  const { listings, getListingsByUserId } = useContext(HouseContext)
  

  const [listingsListItems, setListingsListItems] = useState()

  const [profile, setProfile] = useState({})

  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     .then(setProfile)
     .then(getListingsByUserId(localStorage.getItem("swipeHome_user")))
  }, [])

  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     .then(setProfile)
     .then(getListingsByUserId(localStorage.getItem("swipeHome_user")))
  },[listingsListItems])

  const currentUser = profile
  //    cus = currentUserSearches...
  const cul = listings.sort((s1, s2) => (s1.id < s2.id ? 1 : -1))
  //-------
  const history = useHistory()
  const currentUserId = parseInt(localStorage.getItem("swipeHome_user"))

  const logOut = () => {
    localStorage.removeItem("swipeHome_user")
    history.push("/")
  }

  const removeListing = (houseId, currentUserId) => {
    deleteListingById(houseId)
      .then(setListingsListItems)
  }
  const handleListingClick = (id, property_id) => {
    getHouseById(parseInt(id))
    .then(() => history.push(`/listing/detail/${id}`))
  }
  
  // debugger
  
  return (
    <>
      <section className="listingsList__container" key={currentUser.id}>
        <div className="houseCard">
          <div>Your Listings</div>
      { listings.map((listing) => {
          return (
            <div className="listingList">
            <img className="listingListImage" src={listing.photos[0].href} />
            <Button onClick={() => handleListingClick(listing.id)}>{listing.address.line} {listing.address.city}</Button>
            <IconButton className="listingListButton">
              <EditIcon />
            </IconButton>
            <IconButton className="listingListButton" onClick={() => {removeListing(listing.id)}}>
              <DeleteForeverIcon />
            </IconButton>
            </div>
          )
        })}
        </div>
      </section>
    </>
  )
}
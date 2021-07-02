
import React from "react"
import { useContext, useState, useEffect } from "react"
import { SearchContext } from "./SearchProvider"
import { FaveContext } from "../fave/FaveProvider"
import "./Search.css"
import TinderCard from "react-tinder-card"
import { Button } from "@material-ui/core"
import { UserContext } from "../user/UserProvider"
import { useHistory } from 'react-router'

export const SearchResultsList = () => {
  const { houses, localHouses } = useContext(SearchContext)
  const { faves, addFave } = useContext(FaveContext)
  const [lastDirection, setLastDirection] = useState()
  const { getUserById } = useContext(UserContext)
  const [user, setUser ] = useState({})
  const history = useHistory()

  useEffect(() => {
    getUserById(localStorage.getItem("swipeHome_user"))
    .then(setUser)
  }, [])

  const swiped = (direction, houseId, property_id, address, city, state_code, postal_code, photo, beds, baths, price, brokerName) => {
    const newFave = {
      userId: parseInt(localStorage.getItem("swipeHome_user")),
      houseId,
      property_id,
      address,
      city,
      state_code,
      postal_code,
      beds,
      baths,
      price,
      photo,
      brokerName,
      timeStamp: Date.now()
    }
   
    if (direction === "right") {
      if (faves.filter(f => f.property_id === property_id).length === 0) {
        /* faves doesn't contain the a fave with the same property_id */
        addFave(newFave)
      }
      setLastDirection(direction)
    }
  }


  const allHouses = houses.concat(localHouses)

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  // console.log(user)
  // debugger
  return (
    user.userTypeId === 1 ? <>
      <section className="searchCard__container">
        { allHouses.map((search) => {
          return (
            <>
            <TinderCard className='swipe search' preventSwipe={["up", "down"]} key={search.property_id} onSwipe={(dir) => swiped(dir, search.id, search.property_id, search.address.line, search.address.city, search.address.state_code, search.address.postal_code, search.photos[0].href, search.beds, search.baths_full, search.price, search.branding?.listing_office.list_item.name)} onCardLeftScreen={() => outOfFrame(search.property_id)}>
              <div style={{backgroundImage: `url(${search?.photos[0]?.href})`}} className="searchCard">
                <div className="searchCardTitle">
                <h3>{search.address.line} {search.address.city},{search.address.state_code} {search.address.postal_code}</h3>
                <div className="bedsPrice">
                <div className="bedsBaths">
                <h4 className="beds">Beds: {search.beds}</h4>
                <h4>Baths: {search.baths_full}</h4>
                </div>
                <h3>Price: ${search.price}</h3>
                </div>
                </div>
              </div>
            </TinderCard>
            {/* <Buttons /> */}
            </>
          )
        })}
        <button onClick={() => {history.push("/search")}}>Search Again</button>
      </section>
    </> :
    <>
      <section className="searchCard__container">
        { houses.map((search) => {
          return (
            <>
            <TinderCard className='swipe search bordersearch' preventSwipe={["up", "down"]} key={search.property_id} onSwipe={(dir) => swiped(dir, search.id, search.property_id, search.address.line, search.address.city, search.address.state_code, search.address.postal_code, search.thumbnail, search.beds, search.baths_full, search.price, search.branding.listing_office.list_item.name)} onCardLeftScreen={() => outOfFrame(search.property_id)}>
              <div style={{backgroundImage: `url(${search.thumbnail})`}} className="searchCard">
                <div className="searchCardTitle">
                <h3>{search.address.line} {search.address.city},{search.address.state_code} {search.address.postal_code}</h3>
                <div className="bedsPrice">
                <div className="bedsBaths">
                <h4 className="beds">Beds: {search.beds}</h4>
                <h4>Baths: {search.baths_full}</h4>
                </div>
                <h3>Price: ${search.price}</h3>
                </div>
                </div>
              </div>
            </TinderCard>
            {/* <Buttons /> */}
            </>
          )
        })}

      </section>
    </>
  )
}

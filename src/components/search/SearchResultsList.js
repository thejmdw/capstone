
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { SearchContext } from "./SearchProvider"
import { FaveContext } from "../fave/FaveProvider"
import "./Search.css"
import TinderCard from "react-tinder-card"
import { Buttons } from "../buttons/Buttons"

export const SearchResultsList = () => {
  const { houses, getHouses } = useContext(SearchContext)
  const { faves, addFave, getFaves } = useContext(FaveContext)

  const [lastDirection, setLastDirection] = useState()

  // useEffect(() => {
  //   getHouses()
  // },[])

  const swiped = (direction, property_id, address, city, state_code, postal_code, photo, beds, baths, price) => {
    const newFave = {
      userId: parseInt(localStorage.getItem("swipeHome_user")),
      property_id,
      address,
      city,
      state_code,
      postal_code,
      beds,
      baths,
      price,
      photo,
      timeStamp: Date.now()
    }
    console.log('added Fave: ' + property_id)
    debugger
    if (direction === "right") {
      if (faves.filter(f => f.property_id === property_id).length === 0) {
        /* faves doesn't contain the a fave with the same property_id */
        addFave(newFave)
      }
      setLastDirection(direction)
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <>
      <section className="searchCard__container">
        { houses.map((search) => {
          return (
            <>
            <TinderCard className='swipe search' preventSwipe={["up", "down"]} key={search.property_id} onSwipe={(dir) => swiped(dir, search.property_id, search.address.line, search.address.city, search.address.state_code, search.address.postal_code, search.photos[0].href, search.beds, search.baths_full, search.price)} onCardLeftScreen={() => outOfFrame(search.property_id)}>
              <div style={{backgroundImage: `url(${search.photos[0].href})`}} className="searchCard">
                <h5>{search.address.line} {search.address.city},{search.address.state_code} {search.address.postal_code}</h5>
                <h5>Beds: {search.beds}</h5>
                <h5>Baths: {search.baths_full}</h5>
                <h2>Price: ${search.price}</h2>
              </div>
            </TinderCard>
            {/* <Buttons /> */}
            </>
          )
        })}
      </section>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </>
  )
}

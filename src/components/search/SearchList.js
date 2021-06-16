
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { SearchContext } from "./SearchProvider"
import { FaveContext } from "../fave/FaveProvider"
import "./Search.css"
import TinderCard from "react-tinder-card"
import { Buttons } from "../buttons/Buttons"

export const SearchList = () => {
  const { houses, getHouses } = useContext(SearchContext)
  const { faves, getFaves } = useContext(FaveContext)

  const [lastDirection, setLastDirection] = useState()

  // useEffect(() => {
  //   getHouses()
  // },[])

  const swiped = (direction, nameToDelete) => {
    console.log('fetching: ' + nameToDelete)
    setLastDirection(direction)
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
            <TinderCard className='swipe search' preventSwipe={["up", "down"]} key={search.property_id} onSwipe={(dir) => swiped(dir, search.property_id)} onCardLeftScreen={() => outOfFrame(search.property_id)}>
              <div style={{backgroundImage: `url(${search.photos[0].href})`}} className="searchCard">
                <h3>{search.address.line}</h3>
                <h5>{search.property_id}</h5>
              </div>
            </TinderCard>
            <Buttons />
            </>
          )
        })}
      </section>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </>
  )
}

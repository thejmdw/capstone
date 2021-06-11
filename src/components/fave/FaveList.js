import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { FaveContext } from "./FaveProvider"
import "./Fave.css"
import TinderCard from "react-tinder-card"

export const FaveList = () => {
  const { faves, getFaves } = useContext(FaveContext)
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <>
      <section className="faveCard__container">
        { faves.map((fave) => {
          return (
            <TinderCard className='swipe fave' preventSwipe={["up", "down"]} key={fave.property_id} onSwipe={(dir) => swiped(dir, fave.property_id)} onCardLeftScreen={() => outOfFrame(fave.property_id)}>
              {faves.length === 0 ? <div>You Haven't Selected Any Faves</div> : <div style={{backgroundImage: `url(${fave.photos[0].href})`}} className="faveCard">
                <h3>{fave.address.line}</h3>
                <h5>{fave.property_id}</h5>
              </div>}
            </TinderCard>
          )
        })}
      </section>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </>
  )
}

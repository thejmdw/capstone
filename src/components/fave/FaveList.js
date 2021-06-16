import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { FaveContext } from "./FaveProvider"
import "./Fave.css"
import TinderCard from "react-tinder-card"
import { Buttons } from "../buttons/Buttons"

export const FaveList = () => {
  const { faves, favesDetail, getFaves, getFavesByUserId, removeFave, getFaveDetails } = useContext(FaveContext)
  const [lastDirection, setLastDirection] = useState()
  const history = useHistory()

  const [faveDetails, setFaveDetails] = useState([])

  useEffect(() => {
    getFavesByUserId(localStorage.getItem("swipeHome_user"))
  }, [])

  const swiped = (direction, id) => {
    console.log('removing: ' + id)
    if (direction === "left") {
      removeFave(id)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  debugger
  faves.forEach((fave) => {
      getFaveDetails(fave.property_Id, faveDetails)
  } )

  return (
    <>
      <section className="faveCards__container">
        {faveDetails.length === 0 ? <div>Please select some faves to display your list of Faves!</div> : 
         faveDetails.map((fave) => {
          return (
            <>
            <TinderCard className='swipe fave' preventSwipe={["up", "down"]} key={fave.id} onSwipe={(dir) => swiped(dir, fave.id)} onCardLeftScreen={() => outOfFrame(fave.property_id)}>
              <div className="faveCard" >
                <div onClick={() => history.push(`/faves/detail/${fave.id}`)}>
                {/* <h3>{fave.address.line}</h3> */}
                <h5>{fave.property_id}</h5>
                </div>
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

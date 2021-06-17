import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FaveContext } from "./FaveProvider"
import "./Fave.css"
import TinderCard from "react-tinder-card"

export const Fave = () => {
  const { faves, getFaveById } = useContext(FaveContext)
  const [ setFave]  = useState({})
  const [ lastDirection, setLastDirection] = useState()
  const history = useHistory()
  const faveId = useParams()

  useEffect(() => {
    getFaveById(parseInt(faveId))
      .then(setFave)
  }, [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <>
      <section className="faveCards__container">
        {faves.length === 0 ? <div>Please select some faves to display your list of Faves!</div> : 
         faves.map((fave) => {
          return (
            <TinderCard className='swipe fave' preventSwipe={["up", "down","left", "right"]} key={fave.property_id} onSwipe={(dir) => swiped(dir, fave.property_id)} onCardLeftScreen={() => outOfFrame(fave.property_id)}>
              <div className="faveCard" onClick={() => history.push(`/faves/detail/${fave.id}`)}>
                {/* <h3>{fave.address.line}</h3> */}
                <h5>{fave.property_id}</h5>
              </div>
            </TinderCard>
          )
        })}
      </section>
      {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
    </>
  )
}

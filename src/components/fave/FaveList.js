import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { FaveContext } from "./FaveProvider"
import "./Fave.css"
import TinderCard from "react-tinder-card"
import { Buttons } from "../buttons/Buttons"

export const FaveList = () => {
  const { faves, getFavesByUserId, removeFave, getFaveDetail, getFaveById } = useContext(FaveContext)
  const [lastDirection, setLastDirection] = useState()
  const history = useHistory()

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

  const shuffle = array => {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const shuffledFaves = shuffle(faves)

  const handleFaveClick = (id, property_id) => {
    property_id ? getFaveDetail(property_id).then(() => history.push(`/faves/detail/${id}`)) : getFaveById(id)
    .then(() => history.push(`/faves/detail/${id}`))
  }
  
  return (
    <>
      <section className="faveCards__container">
        {shuffledFaves.length === 0 ? <div>You don't have any faves selected!</div> : 
         shuffledFaves.map((fave) => {
          return (
            <>
            <TinderCard className='swipe fave' preventSwipe={["up", "down"]} key={fave.id} onSwipe={(dir) => swiped(dir, fave.id)} onCardLeftScreen={() => outOfFrame(fave.property_id)}>
            <div style={{backgroundImage: `url(${fave.photo})`}} className="faveCard" onClick={() => {handleFaveClick(fave.id, fave.property_id)}}>
                <div className="faveCardTitle" onClick={() => {handleFaveClick(fave.id ? fave.id : fave.property_id)}}>
                {/* <img  alt="house" className="faveList_housePic"/> */}
                <div className="faveCard_address">
                  <h5>{fave.address} {fave.city}</h5>
                  <h5>{fave.state_code} {fave.postal_code}</h5>
                </div>
                <h5>Beds: {fave.beds}</h5>
                <h5>Baths: {fave.baths}</h5>
                <h2>Price: ${fave.price}</h2>
                </div>
              </div>
            </TinderCard>
            {/* <Buttons /> */}
            </>
          )
        })}
        
      </section>
      {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
    </>
  )
}



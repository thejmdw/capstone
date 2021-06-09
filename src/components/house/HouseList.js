
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { HouseContext } from "./HouseProvider"
import "./House.css"
import TinderCard from "react-tinder-card"

export const HouseList = () => {
  // const alreadyRemoved = []
  
  const { houses, getHouses } = useContext(HouseContext)
  // const [ matches, setMatches ] = useState(houses)
  const [lastDirection, setLastDirection] = useState()
  // let housesState = houses
  
  useEffect(() => {
    getHouses()
  }, [])

  // const history = useHistory()

  //Advanced Swipe Left & Right
  // const childRefs = useMemo(() => Array(houses.length).fill(0).map(i => React.createRef()), [])

  // const swiped = (direction, nameToDelete) => {
  //   console.log('removing: ' + nameToDelete)
  //   setLastDirection(direction)
  //   alreadyRemoved.push(nameToDelete)
  // }

  // const outOfFrame = (property_id) => {
  //   console.log(property_id + ' left the screen!')
  //   housesState.filter(house => house.property_id !== property_id)
  //   setMatches(housesState)
  // }

  // const swipe = (dir) => {
  //   const cardsLeft = matches.filter(match => !alreadyRemoved.includes(match.property_id))
  //   if (cardsLeft.length) {
  //     const toBeRemoved = cardsLeft[cardsLeft.length - 1].propery_id // Find the card object to be removed
  //     const index = houses.map(match => match.property_id).indexOf(toBeRemoved) // Find the index of which to make the reference to
  //     alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
  //     childRefs[index].current.swipe(dir) // Swipe the card!
  //   }
  // }

  //Simple Swipe Left and right...
  //
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  
  // onSwipe={(dir) => swiped(dir, house.property_id)}
  // onCardLeftScreen={() => outOfFrame(house.property_id)} 
  

  return (
    <>
      <section className="houseCards__container">
        { houses.map((house, index) => {
          return (
            <TinderCard className='swipe house' preventSwipe={["up", "down"]} key={house.property_id} onSwipe={(dir) => swiped(dir, house.property_id)} onCardLeftScreen={() => outOfFrame(house.property_id)}>
              <div style={{backgroundImage: `url(${house.photos[0].href})`}} className="houseCard">
                <h3>{house.address.line}</h3>
                <h5>{house.property_id}</h5>
              </div>
            </TinderCard>
          )
        })}
      </section>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
      {/* <div className='buttons'>
        <button onClick={() => swipe('left')}>Swipe left!</button>
        <button onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>} */}
    </>
  )
}
            // <>
            // <img className="house_profilePic"src={house.photos[0].href}></img>
            // <div key={house.listing_id}>{house.listing_id}</div>
            // </>
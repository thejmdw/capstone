
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { HouseContext } from "./HouseProvider"
import "./House.css"
import TinderCard from "react-tinder-card"
import { SearchContext } from "../search/SearchProvider"
import { FaveContext } from "../fave/FaveProvider"

export const HouseList = () => {
  
  const { houses } = useContext(SearchContext)
  const { house, addFave, gethouses } = useContext(FaveContext)
  // const [ matches, setMatches ] = useState(houses)
  const [lastDirection, setLastDirection] = useState()
  // let housesState = houses
  
  // useEffect(() => {
  //   getHouses()
  // }, [])

  // const houses = [
  //   {
  //     property_id: 1,
  //     address: {
  //       line: "main"
  //     },
  //     photos: ["https://brokenlinnk"]
  //   },
  //   {
  //     property_id: 2,
  //     address: {
  //       line: "miching"
  //     },
  //     photos: ["https://brokenlinnk"]
  //   },
  //   {
  //     property_id: 3,
  //     address: {
  //       line: "really"
  //     },
  //     photos: ["https://brokenlinnk"]
  //   },
  // ]

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
  const swiped = (direction, property_id, address, city, state_code, postal_code, photo, beds, baths, price) => {
    const newhouse = {
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
    console.log('added house: ' + property_id)
    if (direction === "right") {
      addFave(newhouse)
    }
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
        { houses.map((house) => {
          return (
            <TinderCard className='swipe house' preventSwipe={["up", "down"]} key={house.property_id} onSwipe={(dir) => swiped(dir, house.property_id, house.address.line, house.address.city, house.address.state_code, house.address.postal_code, house.photos[0].href, house.beds, house.baths_full, house.price )} onCardLeftScreen={() => outOfFrame(house.property_id)}>
              <div style={{backgroundImage: `url(${house.photos[0].href})`}} className="houseCard">
                <h5>{house.address.line} {house.address.city}, {house.address.state_code} {house.address.postal_code}</h5>
                <h5>Beds: {house.beds}</h5>
                <h5>Baths: {house.baths}</h5>
                <h2>Price: ${house.price}</h2>
              </div>
            </TinderCard>
          )
        })}
        {/* <button>Click Here</button> */}
      </section>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
      <div>{houses.length}</div>
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

import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { SearchContext } from "./SearchProvider"
import "./Search.css"
import TinderCard from "react-tinder-card"

export const SearchList = () => {
  // const alreadyRemoved = []
  
  const { searches, getSearches } = useContext(SearchContext)
  // const [ matches, setMatches ] = useState(searchs)
  const [lastDirection, setLastDirection] = useState()
  // let searchsState = searchs
  
  useEffect(() => {
    getSearches()
  }, [])

  // const history = useHistory()

  //Advanced Swipe Left & Right
  // const childRefs = useMemo(() => Array(searchs.length).fill(0).map(i => React.createRef()), [])

  // const swiped = (direction, nameToDelete) => {
  //   console.log('removing: ' + nameToDelete)
  //   setLastDirection(direction)
  //   alreadyRemoved.push(nameToDelete)
  // }

  // const outOfFrame = (property_id) => {
  //   console.log(property_id + ' left the screen!')
  //   searchsState.filter(search => search.property_id !== property_id)
  //   setMatches(searchsState)
  // }

  // const swipe = (dir) => {
  //   const cardsLeft = matches.filter(match => !alreadyRemoved.includes(match.property_id))
  //   if (cardsLeft.length) {
  //     const toBeRemoved = cardsLeft[cardsLeft.length - 1].propery_id // Find the card object to be removed
  //     const index = searchs.map(match => match.property_id).indexOf(toBeRemoved) // Find the index of which to make the reference to
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
  
  // onSwipe={(dir) => swiped(dir, search.property_id)}
  // onCardLeftScreen={() => outOfFrame(search.property_id)} 
  

  return (
    <>
      <section className="searchCards__container">
        { searches.map((search, index) => {
          return (
            <TinderCard className='swipe search' preventSwipe={["up", "down"]} key={search.property_id} onSwipe={(dir) => swiped(dir, search.property_id)} onCardLeftScreen={() => outOfFrame(search.property_id)}>
              <div style={{backgroundImage: `url(${search.photos[0].href})`}} className="searchCard">
                <h3>{search.address.line}</h3>
                <h5>{search.property_id}</h5>
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
            // <img className="search_profilePic"src={search.photos[0].href}></img>
            // <div key={search.listing_id}>{search.listing_id}</div>
            // </>

import React from "react"
import { useContext, useState, useEffect, useMemo } from "react"
import { SearchContext } from "./SearchProvider"
import { FaveContext } from "../fave/FaveProvider"
import "./Search.css"
import TinderCard from "react-tinder-card"
import { IconButton } from "@material-ui/core"
import ReplayIcon from "@material-ui/icons/Replay"
import CloseIcon from "@material-ui/icons/Close"
import FavoriteIcon from "@material-ui/icons/Favorite"
import { UserContext } from "../user/UserProvider"
import { useHistory } from 'react-router'
import { Buttons } from "../buttons/Buttons.js"

const alreadyRemoved = []

export const SearchResultsList = () => {
  const { houses, localHouses } = useContext(SearchContext)
  const { faves, addFave } = useContext(FaveContext)
  const { getUserById } = useContext(UserContext)
  const [user, setUser ] = useState({})
  const history = useHistory()
  
  useEffect(() => {
    getUserById(localStorage.getItem("swipeHome_user"))
    .then(setUser)
  }, [])
  
  
  const goBack = () => {
    history.goBack()
  }
  // const swiped = (direction, houseId, property_id, address, city, state_code, postal_code, photo, beds, baths, price, brokerName) => {
  //   const newFave = {
  //     userId: parseInt(localStorage.getItem("swipeHome_user")),
  //     houseId,
  //     property_id,
  //     address,
  //     city,
  //     state_code,
  //     postal_code,
  //     beds,
  //     baths,
  //     price,
  //     photo,
  //     brokerName,
  //     timeStamp: Date.now()
  //   }
   
  //   if (direction === "right") {
  //     if (faves.filter(f => f.property_id === property_id).length === 0) {
  //       /* faves doesn't contain the a fave with the same property_id */
  //       addFave(newFave)
  //     }
  //     setLastDirection(direction)
  //     alreadyRemoved.push(nameToDelete)
  //   }
  // }

  
  // const outOfFrame = (name) => {
  //   console.log(name + ' left the screen!')
  // }
  
    const allHouses = houses.concat(localHouses)
    
    const alreadyRemoved = []
    let houseState = allHouses

    // const { housesList, setHousesList } = useState(allHouses)
    const housesList = allHouses
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(allHouses.length).fill(0).map(i => React.createRef()), [])

  
  //-------
  
  // const swiped = (direction, nameToDelete) => {  ...---see swiped above
  //   console.log('removing: ' + nameToDelete)
  //   setLastDirection(direction)
  //   alreadyRemoved.push(nameToDelete)
  // }

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
      alreadyRemoved.push(property_id)
    }
  }
  
  const outOfFrame = (property_id) => {
    console.log(property_id + ' left the screen!')
    houseState = houseState.filter(house => house.property_id !== property_id)
    
  }
  
  const swipe = (dir) => {
    // debugger
    const cardsLeft = housesList.filter(house => !alreadyRemoved.includes(house.property_id))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].property_id // Find the card object to be removed
      const index = allHouses.map(house => house.property_id).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
    console.log("HEY!")
  }
  
  //-------
  // console.log(user)
  // debugger
  return (
    user.userTypeId === 1 ? <>
      <section className="searchCard__container">
        { allHouses.map((search, index) => {
          return (
            <>
            <TinderCard ref={childRefs[index]} className='swipe search' preventSwipe={["up", "down"]} key={search.property_id} onSwipe={(dir) => swiped(dir, search.id, search.property_id, search.address.line, search.address.city, search.address.state_code, search.address.postal_code, search.photos[0].href, search.beds, search.baths_full, search.price, search.branding?.listing_office.list_item.name)} onCardLeftScreen={() => outOfFrame(search.property_id)}>
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
            <div className="rowButtons">
      <IconButton className="buttons_repeat" onClick={goBack}>
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className="buttons_left" onClick={() => swipe('left')}>
        <CloseIcon fontSize="large" />
      </IconButton >
      {/* <IconButton className="buttons_star">
        <StarRateIcon fontSize="large" />
      </IconButton> */}
      <IconButton className="buttons_right" onClick={() => swipe('right')}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
      {/* <IconButton className="buttons_lightning">
        <FlashOnIcon fontSize="large" />
      </IconButton> */}
    </div>
            {/* <Buttons /> */}
            </>
          )
        })}
        <button onClick={() => {history.push("/search")}}>Search Again</button>
      {/* <div className="rowButtons">
      <IconButton className="buttons_repeat" onClick={goBack}>
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className="buttons_left" onClick={() => swiped('left')}>
        <CloseIcon fontSize="large" />
      </IconButton >
      {/* <IconButton className="buttons_star">
        <StarRateIcon fontSize="large" />
      </IconButton> */}
      <IconButton className="buttons_right" onClick={() => swiped('right')}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
      {/* <IconButton className="buttons_lightning">
        <FlashOnIcon fontSize="large" />
      </IconButton>
     </div> */ }
      </section>
      {/* <Buttons /> */}
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
            
            </>
          )
        })}

      </section>
      <div className="rowButtons">
      <IconButton className="buttons_repeat" onClick={goBack}>
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className="buttons_left" onClick={() => swiped('left')}>
        <CloseIcon fontSize="large" />
      </IconButton >
      {/* <IconButton className="buttons_star">
        <StarRateIcon fontSize="large" />
      </IconButton> */}
      <IconButton className="buttons_right" onClick={() => swiped('right')}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
      {/* <IconButton className="buttons_lightning">
        <FlashOnIcon fontSize="large" />
      </IconButton> */}
    </div>
    </>
  )
}

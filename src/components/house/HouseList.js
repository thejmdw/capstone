
import React from "react"
import { useContext, useEffect, useState } from "react"
import "./House.css"
import TinderCard from "react-tinder-card"
import { SearchContext } from "../search/SearchProvider"
import { FaveContext } from "../fave/FaveProvider"
import { UserContext } from "../user/UserProvider"

export const HouseList = () => {
  
  const { houses, localHouses } = useContext(SearchContext)
  const { faves, addFave, getFavesByUserId } = useContext(FaveContext)
  const [lastDirection, setLastDirection] = useState()
  const { getUserById } = useContext(UserContext)

  const [ user, setUser] = useState({})
  useEffect(() => {
    getUserById(localStorage.getItem("swipeHome_user"))
    .then((data) => {setUser(data)})
    .then(() => {getFavesByUserId(localStorage.getItem("swipeHome_user"))})
  }, [])
  

  const swiped = (direction, property_id, address, city, state_code, postal_code, photo, beds, baths, price) => {
    const newHouse = {
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
    if (direction === "right") {
      if (faves.filter(f => f.property_id === property_id).length === 0) {
        /* faves doesn't contain the a fave with the same property_id */
        addFave(newHouse)
      }
      setLastDirection(direction)
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  
  const allHouses = houses.concat(localHouses)
  debugger
  console.log(allHouses)
  return (
    user.userTypeId === 1 ? <>
      <section className="searchCard__container">
        { allHouses.map((search) => {
          return (
            <>
            <TinderCard className='swipe search' preventSwipe={["up", "down"]} key={search.property_id} onSwipe={(dir) => swiped(dir, search.property_id, search.address.line, search.address.city, search.address.state_code, search.address.postal_code, search.photos[0].href, search.beds, search.baths_full, search.price)} onCardLeftScreen={() => outOfFrame(search.property_id)}>
              <div style={{backgroundImage: `url(${search?.photos[0]?.href})`}} className="searchCard">
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
    </> :
    <>
      <section className="searchCard__container">
        { allHouses.map((search) => {
          return (
            <>
            <TinderCard className='swipe search' preventSwipe={["up", "down"]} key={search.property_id} onSwipe={(dir) => swiped(dir, search.property_id, search.address.line, search.address.city, search.address.state_code, search.address.postal_code, search.thumbnail, search.beds, search.baths_full, search.price)} onCardLeftScreen={() => outOfFrame(search.property_id)}>
              <div style={{backgroundImage: `url(${search.thumbnail})`}} className="searchCard">
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
    </>
    
    
    
    
    
    // <>
    //   <section className="houseCards__container">
    //     { houses.map((house) => {
    //       return (
    //         <TinderCard className='swipe house' preventSwipe={["up", "down"]} key={house.property_id} onSwipe={(dir) => swiped(dir, house.property_id, house.address.line, house.address.city, house.address.state_code, house.address.postal_code, house.photos[0].href, house.beds, house.baths_full, house.price )} onCardLeftScreen={() => outOfFrame(house.property_id)}>
    //           <div style={{backgroundImage: `url(${house.photos[0].href})`}} className="houseCard">
    //             <h5>{house.address.line} {house.address.city}, {house.address.state_code} {house.address.postal_code}</h5>
    //             <h5>Beds: {house.beds}</h5>
    //             <h5>Baths: {house.baths}</h5>
    //             <h2>Price: ${house.price}</h2>
    //           </div>
    //         </TinderCard>
    //       )
    //     })}
    //     {/* <button>Click Here</button> */}
    //   </section>
    //   {/* {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    //   <div>{houses.length}</div> */}
    //   </>
  )
}
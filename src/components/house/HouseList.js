
import React from "react"
import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { HouseContext } from "./HouseProvider"
import "./House.css"
import TinderCard from "react-tinder-card"

export const HouseList = () => {
  const { houses, getHouses } = useContext(HouseContext)

  useEffect(() => {
    getHouses()
  }, [])

  const history = useHistory()

  const onSwipe = (d) => {
    if (d === 'down') {
      window.alert("You Swiped Left")
    } else {
      window.alert("You Swiped Right")
    }
  } 

  return (
    <>
      <section className="houseCards__container">
        { houses.map((house) => {
          return (
            <TinderCard className="swipe" key={house.property_id}  onSwipe={onSwipe} >
              <div style={{backgroundImage: `url(${house.photos[0].href})`}} className="houseCard">
                <h3>{house.address.line}</h3>
                <h5>{house.property_id}</h5>
              </div>
            </TinderCard>
          )
        })}
      </section>
    </>
  )
}
            // <>
            // <img className="house_profilePic"src={house.photos[0].href}></img>
            // <div key={house.listing_id}>{house.listing_id}</div>
            // </>
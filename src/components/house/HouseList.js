
import React from "react"
import { useContext, useEffect } from "react"
import { HouseContext } from "./HouseProvider"
import "./House.css"

export const HouseList = () => {
  const { houses, getHouses } = useContext(HouseContext)

  useEffect(() => {
    getHouses()
  }, [])

  return (
    <>
      <h3>Houses</h3>
      <section>
        { houses.map((house) => {
          return (
            <>
            <img className="house_profilePic"src={house.photos[0].href}></img>
            <div key={house.listing_id}>{house.listing_id}</div>
            </>
          )
        })}
      </section>
    </>
  )
}
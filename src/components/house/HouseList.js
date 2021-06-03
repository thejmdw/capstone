import React from "react"
import { useContext, useEffect } from "react"
import { HouseContext } from "./HouseProvider"

export const HouseList = () => {
  const { houses, getHouses } = useContext(HouseContext)

  useEffect(() => {
    getHouses()
  }, [])

  return (
    <>
      <h3>Houses</h3>
    </>
  )
}
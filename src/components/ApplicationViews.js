import React from "react"
import { HouseProvider } from "./house/HouseProvider"
import { HouseList } from "./house/HouseList"

export const ApplicationViews = () => {
  return (
    <>
      <HouseProvider>
        <HouseList />
      </HouseProvider>
    </>
  )
}
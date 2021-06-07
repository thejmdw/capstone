import React from "react"
import { HouseProvider } from "./house/HouseProvider"
import { SearchProvider } from "./search/SearchProvider"
import { HouseList } from "./house/HouseList"
import { Route } from "react-router"
import { SearchForm } from "./search/SearchForm"

export const ApplicationViews = () => {
  return (
    <>
    <SearchProvider>
      <HouseProvider>
        <Route exact path="/">
        <HouseList />
        </Route>

        <Route exact path="/search">
          <SearchForm />
        </Route>
      </HouseProvider>
      </SearchProvider>
    </>
  )
}
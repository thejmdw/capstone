import React from "react"
import { HouseProvider } from "./house/HouseProvider"
import { SearchProvider } from "./search/SearchProvider"
import { HouseList } from "./house/HouseList"
import { Route } from "react-router"
import { SearchForm } from "./search/SearchForm"
import { SearchList } from "./search/SearchList"
import { UserProvider } from "./user/UserProvider"
import { User } from "./user/User"


export const ApplicationViews = () => {
  return (
    <>
    <SearchProvider>
      <HouseProvider>
        <UserProvider>
          
        <Route exact path="/profile">
        {/* <HouseList /> */}
          <User />
        </Route>

        <Route exact path="/houses">
        <HouseList />
        </Route>

        <Route exact path="/search">
          <SearchForm />
        </Route>
        <Route exact path="/searchList">
          <SearchList />
        </Route>

        </UserProvider>
      </HouseProvider>
      </SearchProvider>
    </>
  )
}
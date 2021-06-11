import React from "react"
import { Route } from "react-router-dom"
//providers
import { HouseProvider } from "./house/HouseProvider"
import { SearchProvider } from "./search/SearchProvider"
import { UserProvider } from "./user/UserProvider"
import { FaveProvider } from "./fave/FaveProvider"
//lists
import { HouseList } from "./house/HouseList"
import { SearchList } from "./search/SearchList"
import { FaveList } from "./fave/FaveList"
//forms
import { SearchForm } from "./search/SearchForm"
//items
import { User } from "./user/User"
import { Home } from "./home/Home"


export const ApplicationViews = () => {
  return (
    <>
    <SearchProvider>
      <HouseProvider>
        <UserProvider>
          <FaveProvider>

            <Route exact path="/houseList">
              <HouseList />
            </Route>

          
            <Route exact path="/profile">
              <User />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/search">
              <SearchForm />
            </Route>
            <Route exact path="/searchList">
              <SearchList />
            </Route>

            <Route exact path="/faves/:userId(\d+)">
              <FaveList />
            </Route>

          </FaveProvider>
        </UserProvider>
      </HouseProvider>
      </SearchProvider>
    </>
  )
}
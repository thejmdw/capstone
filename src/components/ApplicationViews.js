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
import { SearchResultsList } from "./search/SearchResultsList"
import { FaveList } from "./fave/FaveList"
//forms
import { SearchForm } from "./search/SearchForm"
import { UserForm } from "./user/UserForm"
//items
import { User } from "./user/User"
import { Home } from "./home/Home"
import { FirstTimeHome } from "./home/FirstTimeHome"
import { Fave } from "./fave/Fave"


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
            <Route path="/profile/edit/:userId(\d+)">
              <UserForm />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/new">
              <FirstTimeHome />
            </Route>
            

            <Route exact path="/search">
              <SearchForm />
            </Route>
            <Route exact path="/searches">
              <SearchList />
            </Route>
            <Route exact path="/searchResultsList">
              <SearchResultsList />
            </Route>

            <Route exact path="/faves">
              <FaveList />
            </Route>
            <Route exact path="/faves/detail/:faveId(\d+)">
              <Fave />
            </Route>

          </FaveProvider>
        </UserProvider>
      </HouseProvider>
      </SearchProvider>
    </>
  )
}
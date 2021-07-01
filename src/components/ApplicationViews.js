import React from "react"
import { Route } from "react-router-dom"
//providers
import { HouseProvider } from "./house/HouseProvider"
import { SearchProvider } from "./search/SearchProvider"
import { UserProvider } from "./user/UserProvider"
import { FaveProvider } from "./fave/FaveProvider"
import { MessageProvider } from "./chat/MessageProvider"
//lists
import { HouseList } from "./house/HouseList"
import { SearchList } from "./search/SearchList"
import { SearchResultsList } from "./search/SearchResultsList"
import { FaveList } from "./fave/FaveList"
import { ChatList } from "./chat/ChatList"
//forms
import { SearchForm } from "./search/SearchForm"
import { UserForm } from "./user/UserForm"
import { ListingForm } from "./house/ListingForm"

//items
import { User } from "./user/User"
import { Home } from "./home/Home"
import { FirstTimeHome } from "./home/FirstTimeHome"
import { Fave } from "./fave/Fave"
import { Chat } from "./chat/Chat"
import { theme } from "./theme"
import { ThemeProvider } from "@material-ui/core"


export const ApplicationViews = () => {
  return (
    <>
    <ThemeProvider theme={theme} >
    <SearchProvider>
      <HouseProvider>
        <UserProvider>
          <FaveProvider>
            {/* <MessageProvider> */}

            <Route exact path="/houseList">
              <HouseList />
            </Route>

            <Route exact path="/messages">
              <ChatList />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>

            <Route exact path="/listing">
              <ListingForm />
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

            {/* </MessageProvider> */}
          </FaveProvider>
        </UserProvider>
      </HouseProvider>
      </SearchProvider>
      </ThemeProvider>
    </>
  )
}
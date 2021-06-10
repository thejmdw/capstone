
import React from "react"
import { useContext, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./User.css"
import TinderCard from "react-tinder-card"
import Button from '@material-ui/core/Button';
import { SearchContext } from "../search/SearchProvider"


export const User = () => {
  // const alreadyRemoved = []
  
  const { user, users, getUsers, getUserById, setUser } = useContext(UserContext)
  const { searches, getSearchesByUserId } = useContext(SearchContext)
  // const [ matches, setMatches ] = useState(houses)
  const [lastDirection, setLastDirection] = useState()
  // let housesState = houses
  
  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("swipeHome_user")))
     .then(getSearchesByUserId(localStorage.getItem("swipeHome_user")))
  }, [])

  // const history = useHistory()

  //Advanced Swipe Left & Right
  // const childRefs = useMemo(() => Array(houses.length).fill(0).map(i => React.createRef()), [])

  // const swiped = (direction, nameToDelete) => {
  //   console.log('removing: ' + nameToDelete)
  //   setLastDirection(direction)
  //   alreadyRemoved.push(nameToDelete)
  // }

  // const outOfFrame = (property_id) => {
  //   console.log(property_id + ' left the screen!')
  //   housesState.filter(house => house.property_id !== property_id)
  //   setMatches(housesState)
  // }

  // const swipe = (dir) => {
  //   const cardsLeft = matches.filter(match => !alreadyRemoved.includes(match.property_id))
  //   if (cardsLeft.length) {
  //     const toBeRemoved = cardsLeft[cardsLeft.length - 1].propery_id // Find the card object to be removed
  //     const index = houses.map(match => match.property_id).indexOf(toBeRemoved) // Find the index of which to make the reference to
  //     alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
  //     childRefs[index].current.swipe(dir) // Swipe the card!
  //   }
  // }

  //Simple Swipe Left and right...
  //
  // const swiped = (direction, nameToDelete) => {
  //   console.log('removing: ' + nameToDelete)
  //   setLastDirection(direction)
  // }

  // const outOfFrame = (name) => {
  //   console.log(name + ' left the screen!')
  // }
  const currentUser = user
  const currentUserSearches = searches
  const history =useHistory()

  const logOut = () => {
    localStorage.removeItem("swipeHome_user")
    history.push("/")
  }
  // debugger
  return (
    <>
      <section className="userCard__container">
            <div className='userProfile_container' key={currentUser.id}>
              <div className="userCard">
                <h3>{currentUser.name}</h3>
                <h5>{currentUser.email}</h5>
                <div>
                  <div>Search List</div>
                  {currentUserSearches.length === 0 ? <div>You Haven't Searched for Anything Yet</div> :
                  <div>
                    {currentUserSearches.map((search) => {return (<div>{search.city}{search.state_code}{search.postal_code}</div>)})}
                  </div>}
                </div>
                <div>
                  <Button>Faves</Button>
                  <Button>Edit Info</Button>
                  <Button onClick={logOut}>Log Out</Button>
                </div>
              </div>
            </div>
      </section>
    </>
  )
}


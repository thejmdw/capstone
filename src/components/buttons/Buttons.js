// import React from 'react'
// import ReplayIcon from '@material-ui/icons/Replay'
// import CloseIcon from '@material-ui/icons/Close'
// import StarRateIcon from '@material-ui/icons/StarRate'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import FlashOnIcon from '@material-ui/icons/FlashOn'
// import IconButton from '@material-ui/core/IconButton'
// import './Buttons.css'
// import { useHistory } from 'react-router'
// import swiped  from "../search/SearchResultsList"

// export const Buttons = () => {

//   const history = useHistory()

//   const goBack = () => {
//     history.goBack()
//   }

//   const alreadyRemoved = []

//   const swiped = (direction, houseId, property_id, address, city, state_code, postal_code, photo, beds, baths, price, brokerName) => {
//     const newFave = {
//       userId: parseInt(localStorage.getItem("swipeHome_user")),
//       houseId,
//       property_id,
//       address,
//       city,
//       state_code,
//       postal_code,
//       beds,
//       baths,
//       price,
//       photo,
//       brokerName,
//       timeStamp: Date.now()
//     }
   
//     if (direction === "right") {
//       if (faves.filter(f => f.property_id === property_id).length === 0) {
//         /* faves doesn't contain the a fave with the same property_id */
//         addFave(newFave)
//       }
//       setLastDirection(direction)
//     }
//   }

//   const swipe = (dir) => {
//     const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
//     if (cardsLeft.length) {
//       const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
//       const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
//       alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
//       childRefs[index].current.swipe(dir) // Swipe the card!
//     }
//   }

//   return (
//     <div className="rowButtons">
//       <IconButton className="buttons_repeat" onClick={goBack}>
//         <ReplayIcon fontSize="large" />
//       </IconButton>
//       <IconButton className="buttons_left" onClick={() => swipe('left')}>
//         <CloseIcon fontSize="large" />
//       </IconButton >
//       {/* <IconButton className="buttons_star">
//         <StarRateIcon fontSize="large" />
//       </IconButton> */}
//       <IconButton className="buttons_right" onClick={() => swipe('right')}>
//         <FavoriteIcon fontSize="large" />
//       </IconButton>
//       {/* <IconButton className="buttons_lightning">
//         <FlashOnIcon fontSize="large" />
//       </IconButton> */}
//     </div>
//   )
// }
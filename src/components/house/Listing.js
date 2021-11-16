import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FaveContext } from "../fave/FaveProvider"
import { HouseContext } from "../house/HouseProvider"
import { Button } from "@material-ui/core"
import "../fave/Fave.css"
import TinderCard from "react-tinder-card"
import Carousel from 'nuka-carousel';
// import GoogleMapReact from "google-map-react"

export const Listing = () => {
  const { getFaveById, getFaveDetail } = useContext(FaveContext)
  const { getHouseById } = useContext(HouseContext)
  const history = useHistory()
  const { listingId } = useParams()

  const [ listingDetail, setListingDetail ] = useState({address: {}, photos: []})

  useEffect(() => {
    getFaveById(parseInt(listingId))
    .then(l => getHouseById(l.id))
    .then((data) => setListingDetail(data))
  }, [])

  const handleContactAgent = (userId) => {
    // debugger
      // getMessagesByUserIdAndRecipientId(userId, recipientId)
      // .then(() => {getMessagesByRecipientIdAndUserId(userId, recipientId)})
      // .then(() => {getRecipientById(recipientId)})
      // .then(() => {getSenderById(userId)})
      // .then(() => {localStorage.setItem("sender_id", userId)})
      // .then(() => {history.push(`/chat`)})
      localStorage.setItem("sender_id", userId)
      history.push(`/chat`)
  }
  // const AnyReactComponent = ({ text }) => <div>{text}</div>

  return (
    
      <section className="faveDetailCard__container">
        
            
              <div className="faveDetailCard">
                <Carousel className="faveCarousel">
                  {listingDetail.photos?.slice(0, 16).map(p => <img src={p.href} alt="housing"></img>)}
                </Carousel>
                <div className="faveDetailFlex">
                  
                <div className="faveDetailFlexColumn">
                    <div>
                    <h4>{listingDetail.address?.line} </h4>
                    <h4>{listingDetail.address?.city},{listingDetail.address?.state_code} {listingDetail.address?.postal_code}</h4>
                    <h4>{listingDetail.address?.neighborhood_name}</h4>
                    {/* <h3>{faveDetail.prop_type}</h3> */}
                    <h4>Beds: {listingDetail.beds}</h4>
                    <h4>Baths: {listingDetail.baths}</h4>
                    <h3>Price: ${listingDetail.price}</h3>
                    </div>
                    <div>
                  <h4>Listing Agent</h4>
                  {listingDetail.branding ? <div><div>{listingDetail.branding.listing_agent.details?.name}</div><div> {listingDetail.branding.listing_office.details.name}</div><div> {listingDetail.branding.listing_office.details.phone}</div></div> : <Button onClick={() => {handleContactAgent(listingDetail.user.id)}}>{listingDetail.user?.name}</Button>}
                  </div>
                  </div>
                <iframe 
                  // width="250"
                  // height="250"
                  frameborder="0"
                  style={{border:0}}
                  className="faveMaps"
                  src={`https://www.google.com/maps/embed/v1/place?q=${listingDetail.address?.line}${listingDetail.address?.city}${listingDetail.address?.state_code}${listingDetail.address?.lat ? `&center=${listingDetail.address?.lat},${listingDetail.address?.lon}` : ""}&zoom=17&key=AIzaSyBDNm_nEXINx2bsVUSflyt633t7rVecQgA
                  &maptype=roadmap`} />
                </div>
                <div>
                </div>
                {/* <Button variant="contained" color="primary" onClick={() => history.push(`/faves`)}>Back to Faves</Button> */}
              </div>
            
          
       
      </section>
      
      
      )
    }
    
    
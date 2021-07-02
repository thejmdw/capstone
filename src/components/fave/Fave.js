import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FaveContext } from "./FaveProvider"
import { HouseContext } from "../house/HouseProvider"
import { Button } from "@material-ui/core"
import "./Fave.css"
import TinderCard from "react-tinder-card"
import Carousel from 'nuka-carousel';
// import GoogleMapReact from "google-map-react"

export const Fave = () => {
  const { getFaveById, getFaveDetail } = useContext(FaveContext)
  const { getHouseById } = useContext(HouseContext)
  const history = useHistory()
  const { faveId } = useParams()

  const [ faveDetail, setFaveDetail ] = useState({address: {}, photos: []})

  useEffect(() => {
    getFaveById(parseInt(faveId))
    .then(f => f.property_id ? getFaveDetail(f.property_id) : getHouseById(f.houseId))
    .then((data) => setFaveDetail(data))
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
                  {faveDetail.photos?.slice(0, 26).map(p => <img src={p.href} alt="housing"></img>)}
                </Carousel>
                <div className="faveCard_address">
                  <h3>{faveDetail.address.line} </h3>
                  <h3>{faveDetail.address.city},{faveDetail.address.state_code} {faveDetail.address.postal_code}</h3>
                <h3>{faveDetail.address.neighborhood_name}</h3>
                {/* <h3>{faveDetail.prop_type}</h3> */}
                <h3>Beds: {faveDetail.beds}</h3>
                <h3>Baths: {faveDetail.baths}</h3>
                <h3>Price: ${faveDetail.price}</h3>
                </div>
                <iframe 
                  width="250"
                  height="250"
                  frameborder="0"
                  style={{border:0}}
                  src={`https://www.google.com/maps/embed/v1/place?q=${faveDetail.address.line}${faveDetail.address.city}${faveDetail.address.state_codeone}&center=${faveDetail.address.lat},${faveDetail.address.lon}&zoom=17&key=AIzaSyBDNm_nEXINx2bsVUSflyt633t7rVecQgA
                  &maptype=roadmap`} />
                    
                <div>
                  <h4>Listing Agent</h4>
                  {faveDetail.branding ? <div><div>{faveDetail.branding.listing_agent.details?.name}</div><div> {faveDetail.branding.listing_office.details.name}</div><div> {faveDetail.branding.listing_office.details.phone}</div></div> : <Button onClick={() => {handleContactAgent(faveDetail.user.id)}}>{faveDetail.user?.name}</Button>}
                  
                </div>
                <button onClick={() => history.push(`/faves`)}>Back to Faves</button>
              </div>
            
          
       
      </section>
      
      
      )
    }
    
    
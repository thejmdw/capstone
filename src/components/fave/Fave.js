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
                  {faveDetail.photos?.slice(0, 16).map(p => <img src={p.href} alt="housing"></img>)}
                </Carousel>
                <div className="faveDetailFlex">  
                  <div className="faveDetailFlexColumn">
                    <div>
                      <h4>{faveDetail.address.line} </h4>
                      <h4>{faveDetail.address.city},{faveDetail.address.state_code} {faveDetail.address.postal_code}</h4>
                      {/* <h4>{faveDetail.address.neighborhood_name}</h4> */}
                      {/* <h3>{faveDetail.prop_type}</h3> */}
                      <div className="faveDetailFlex" style={{"alignItems" : "center"}}>
                        <div>
                          <h4>Beds: {faveDetail.beds}</h4>
                          <h4>Baths: {faveDetail.baths}</h4>
                        </div>
                        <h3>Price: ${faveDetail.price}</h3>
                      </div>
                    </div>
                  <div>
                <iframe 
                  // width="250"
                  // height="250"
                  frameborder="0"
                  style={{border:0}}
                  className="faveMaps"
                  src={`https://www.google.com/maps/embed/v1/place?q=${faveDetail.address.line}${faveDetail.address.city}${faveDetail.address.state_code}${faveDetail.address.lat ? `&center=${faveDetail.address.lat},${faveDetail.address.lon}` : ""}&zoom=17&key=AIzaSyCcoYDl4NbSK8CmxVaCHK0NlAel3nYVdiY
                  &maptype=roadmap`} />
                  <h4>Listing Agent</h4>
                  {faveDetail.branding ? <div><div>{faveDetail.branding.listing_agent?.details?.name}</div><div> {faveDetail.branding.listing_office?.details.name}</div><div> {faveDetail.branding.listing_office?.details.phone}</div></div> : <Button onClick={() => {handleContactAgent(faveDetail.user.id)}}>{faveDetail.user?.name}</Button>}
                  </div>
                </div>
              </div>
                <div>
                </div>
                {/* <Button variant="contained" color="primary" onClick={() => history.push(`/faves`)}>Back to Faves</Button> */}
              </div>
            
          
       
      </section>
      
      
      )
    }
    
    
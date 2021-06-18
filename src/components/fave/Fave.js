import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FaveContext } from "./FaveProvider"
import "./Fave.css"
import TinderCard from "react-tinder-card"
import Carousel from 'nuka-carousel';

export const Fave = () => {
  const { getFaveById, getFaveDetail } = useContext(FaveContext)
  const history = useHistory()
  const { faveId } = useParams()

  const [ faveDetail, setFaveDetail ] = useState({})

  useEffect(() => {
    getFaveById(faveId)
    .then(f => getFaveDetail(f.property_id))
    .then((data) => setFaveDetail(data))
  }, [])

  return (
    
      <section className="faveDetailCard__container">
        
            
              <div className="faveDetailCard">
                <Carousel className="faveCarousel">
                  {faveDetail.photos?.map(p => <img src={p.href} alt="housing"></img>)}
                </Carousel>
                <div className="faveCard_address">
                  <h3>{faveDetail.address?.line} </h3>
                  <h3>{faveDetail.address?.city},{faveDetail.address?.state_code} {faveDetail.address?.postal_code}</h3>
                </div>
                <h3>{faveDetail.address?.neighborhood_name}</h3>
                <h3>{faveDetail.prop_type}</h3>
                <h3>Beds: {faveDetail.beds}</h3>
                <h3>Baths: {faveDetail.baths}</h3>
                <h3>Price: ${faveDetail.price}</h3>
                <button onClick={() => history.push(`/faves`)}>Back to Faves</button>
              </div>
            
          
       
      </section>
      
      
      )
    }
    
    
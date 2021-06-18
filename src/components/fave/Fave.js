import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FaveContext } from "./FaveProvider"
import "./Fave.css"
import TinderCard from "react-tinder-card"
import Carousel from 'nuka-carousel';

export const Fave = () => {
  const { getFaveById, getFaveDetail } = useContext(FaveContext)
  const [ lastDirection, setLastDirection] = useState()
  const history = useHistory()
  const { faveId } = useParams()

  // const [ faveDetail, setFaveDetail ] = useState({})
  const faveDetail = JSON.parse(localStorage.getItem("fave"))

  // useEffect(() => {
  //   getFaveDetail(propertyId)
  //   // .then(data => {setFaveDetail(data.properties[0])})
  // }, [])


  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    
      <section className="faveDetailCard__container">
        
            
              <div className="faveDetailCard">
                <Carousel className="faveCarousel">
                  {faveDetail.photos.map(p => <img src={p.href} alt="housing"></img>)}
                </Carousel>
                <h3>{faveDetail.address.line} {faveDetail.address.city},{faveDetail.address.state_code} {faveDetail.address.postal_code}</h3>
                <h3>{faveDetail.address.neighborhood_name}</h3>
                <h3>{faveDetail.prop_type}</h3>
                <h3>Beds: {faveDetail.beds}</h3>

                <h3>Baths: {faveDetail.baths}</h3>
              </div>
            
          
       
      </section>
      
      
      )
    }
    
    {/* onClick={() => history.push(`/favesList`)} */}
import React from 'react'
import { Link } from 'react-router-dom'
import style from '../Card/Card.module.css'

export default function Card({name, id, img, diet_types}) {
  return (
    <div className={style.container}>
      <div className={style.name}>
         <h3>{name}</h3>
      </div>
      <div className={style.img}> 
          <img className={style.image} src={img ? img : "https://publicdomainvectors.org/photos/no_food_or_drink_sign.png" } alt='recipe img'/>
      </div>
      <div className={style.diets}>
      {
        diet_types ? diet_types.map( diet => {
        return(
        <span>{diet}</span>)}) :<span>Diets not found</span>
      }
      </div>
      <Link to={`/home/${id}`}>
        <button id={style.button}>About</button>
      </Link>
    </div>
  )
}


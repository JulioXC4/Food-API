import React from 'react'
import { Link } from 'react-router-dom'
import style from '../Card/Card.module.css'

export default function Card({name, id, img, diet_types, created}) {
  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.name}>
          <h3>{name}</h3>
        </div>
        <div className={style.image}> 
          <img className={style.image} src={img ? img : "https://cdn-icons-png.flaticon.com/512/45/45332.png" } alt='recipe img'/>
        </div>
      </div>
      <div className={style.botton}>
        <div className={style.diets}>
        {
          created === true ? diet_types.map(d => (
              <span className={style.spanContainer}>{d.name}</span>
          )) 
          :
          diet_types ? diet_types.map( diet => {
          return(
          <span className={style.spanContainer}>{diet}</span>)}) :<span className={style.spanContainer}>Diets not found</span>
                            }
        {/* {
          diet_types ? diet_types.map( diet => {
          return(
          <span className={style.spanContainer}>{diet}</span>)}) :<span className={style.spanContainer}>Diets not found</span>
        } */}
        </div>
        <div className={style.buttonContainer}>
        <Link to={`/home/${id}`}>
          <button className={style.button}>View Recipe</button>
        </Link>
        </div>
      </div>
    </div>
  )
}


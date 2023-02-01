import {React, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails, clearDetails } from '../../actions/actions.js'
import style from '../Details/Details.module.css'

export default function Details({name, image, idD, dish_types, diet_types, summary, health_score, steps}) {

    const dispatch = useDispatch()
    let {id} = useParams()

    useEffect(() => {
        dispatch(getDetails(id))
        return (
            dispatch(clearDetails())
        )
    }, [dispatch])

    const recipe = useSelector((state) => state.details)

  return (
    <div>
        {
            recipe.length > 0 ?
            recipe.map(e => {
                return (
                 <div className={style.container}>
                    <header className={style.header}>
                    </header>
                    <div className={style.image}>
                        <img src={e.img ? e.img : 'img/default.jpg'} alt='img'/>
                    </div>
                    <div className={style.content}>
                        <div className={style.stats}>
                            <h1 className={style.name}>{e.name}</h1>
                            <span className={style.healthScore}>Health Score: {e.health_score}</span>
                            <div className={style.diets}>
                            {
                                e.created === true ? e.diets.map(d => (
                                    <span className={style.spanContainer}>{d.name}</span>
                                )) 
                                :
                                e.diet_types ? e.diet_types.map( diet => {
                                return(
                                <span className={style.spanContainer}>{diet}</span>)}) :<span className={style.spanContainer}>Diets not found</span>
                            }
                            </div>
                            <div className={style.dishes}>
                            {
                                e.dish_types ? e.dish_types.map( dish => {
                                return(
                                <span className={style.spanContainer}>{dish}</span>)}) :<span className={style.spanContainer}>Dish not found</span>
                            }
                            </div>
                        </div>
                        <div className={style.summary}>
                        <p>{e.summary?.replace(/<[^>]*>/g, '')}</p>
                        </div>
                        <div className={style.steps}>
                            {
                                e.created === true ? e.steps.split(",").map((s, index) => (

                                <div className={style.step}>
                                    <h3 className={style.number}>{index + 1}</h3>
                                    <h3 className={style.stepText}>{s}</h3>
                                </div> 
                                ))
                                :
                                e.steps ? e.steps.map( s => {
                                    return(
                                        <div className={style.step}>
                                            <h3 className={style.number}>{s.number}</h3>
                                            <h3 className={style.stepText}>{s.step}</h3>
                                        </div>
                                    )}
                                ):
                                <span>Steps Not Found</span>
                            }
                        </div>
                    </div>
                 </div>
                )
            })
            : <p> ... Cargando</p>
           }
    </div>
  )
}

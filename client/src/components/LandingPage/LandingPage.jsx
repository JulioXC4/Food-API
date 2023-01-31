import React from 'react'
import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={style.container}>
       <h1 className={style.title}>Henry Food API</h1>
       <Link to = '/home'>
        <button className={style.homeButton}>Home</button>
       </Link>
    </div>
  )
}


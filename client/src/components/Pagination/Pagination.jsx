import React from 'react'
import style from '../Pagination/Pagination.module.css'

export default function Pagination({recipesPerPage, allRecipes, pagination}) {

  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className={style.numbers}>
        {
          pageNumbers && pageNumbers.map(number => (
            <li>
              <button onClick={() => pagination(number)}>{number}</button>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

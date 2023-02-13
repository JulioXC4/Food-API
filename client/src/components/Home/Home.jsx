import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//aciones
import { Link } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import style from '../Home/Home.module.css';
import { getRecipes, filterRecipeByDiet, filterCreated, orderByName, orderByHealthPoints } from '../../actions/actions.js';

export default function Home() {

  const dispatch= useDispatch()
  const allRecipes = useSelector((state) => state.recipes)
  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getRecipes())
  },[dispatch])

  //Handlers:

  function handleClick(e){
    e.preventDefault()
    dispatch(getRecipes())
  }
  function handleSortName(e){
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder('Ordenado ' + e.target.value)
  }
  function handleSortHealthPoints(e){
    e.preventDefault()
    dispatch(orderByHealthPoints(e.target.value))
    setCurrentPage(1)
    setOrder('Ordenado ' + e.target.value)
  }

  function handleFilterDiet(e){
    e.preventDefault();
    dispatch(filterRecipeByDiet(e.target.value))
    setCurrentPage(1)
  }
  function handleFilterCreated(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
  }
  return (
    <div className={style.container}>
      <header className={style.header}>
        <SearchBar />
        <div className={style.filters}>
          <select className={style.select} onChange={e => handleFilterDiet(e)}>
            <option value = "all">All</option>
            <option value = "gluten free">Gluten Free</option>
            <option value = "paleolithic">Paleolithic</option>
            <option value = "lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
            <option value = "vegan">Vegan</option>
            <option value = "primal">Primal</option>
            <option value = "whole 30">Whole 30</option>
            <option value = "pescatarian">Pescatarian</option>
            <option value = "dairy free">Dairy Free</option>
            <option value = "fodmap friendly">Fodmap Friendly</option>
            <option value = "ketogenic">Ketogenic</option>
          </select>
          <select className={style.select} name='Name' onChange={e => handleSortName(e)}>
              <option value = "asc">A - Z</option>
              <option value = "desc">Z - A</option>
          </select>
          <select className={style.select} name='Health_Points'onChange={e => handleSortHealthPoints(e)}>
            <option value = "asc">Less Points</option>
            <option value = "desc">Higher Points</option>
          </select>
        </div>
        <div>
          <Link to = '/recipe'>
            <button className={style.createButton}>Create Recipe</button>
          </Link>
        </div>
      </header>
      <div className={style.pagination}>
        <Pagination recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} pagination={pagination} />
      </div>
      <div className={style.content}>
      {currentRecipes?.map((e) => {
        return(
          <div >
            <Card name={e.name} img={e.img } diet_types={e.diet_types || e.diets} id={e.id} key={e.id} created={e.created}/>
          </div>
        )
      })}
      </div>
    </div>
  )
}


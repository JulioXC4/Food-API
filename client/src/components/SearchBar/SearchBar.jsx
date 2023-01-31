import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipeName } from '../../actions/actions.js'
import style from '../SearchBar/SearchBar.module.css'

export default function SearchBar() {

  const dispatch = useDispatch()
  const [name, setName] = useState("")

  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getRecipeName(name))
  }

  return (
    <div className={style.container}>
      <input
      className={style.text}
      type='text'
      placeholder='Buscar...'
      onChange={(e) => handleInputChange(e)}
      />
      <button className={style.button} type='submit' onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  )
}

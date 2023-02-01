import {React, useState, useEffect} from 'react'
import { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { postRecipe, getDiets } from '../../actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import style from '../CreateRecipe/CreateRecipe.module.css'

export default function CreateRecipe() {

  const dispatch = useDispatch()
  const history = useHistory()
  const diets = useSelector((state) => state.diets)

  const [input, setInput] = useState({
    name: "",
    image: "",
    health_score: "",
    summary: "",
    diet_types: [],
    steps: "",
  })

  const [info, setInfo] = useState({
    name: "",
    image: "",
    health_score: "",
    summary: "",
    diet_types: [],
    steps: "",
  })
  
  let [steps, setSteps] = useState({
    number: 0,
    stepInfo: "No step info",
  })

  const [stepList, setStepList] = useState([])
  let [button, setButton] = useState(0)
  let [buttonDelete, setButtonDelete] = useState(0)
  const [errors, setErrors] = useState({})

  const validate = (input) => {
    let errors = {}

        if(!input.name) errors.name = "Se requiere un nombre"
        if(input.name.length < 8) errors.name = "El nombre debe ser más largo"
        if(!input.health_score ) errors.health_score ="Se requiere health score"
        if(input.health_score > 100) errors.health_score ="El puntaje no puede ser mayor a 100"
        if(input.summary.length < 20) errors.summary = "El resumen debe ser más largo"
        if(input.image.length < 8) errors.image = "Introduce un URL valido"
        if(input.steps.length < 2) errors.steps = "La receta debe tener 2 pasos como minimo"

        return errors
  }

//Handles
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeSteps = (e) => {
    setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    setSteps({
    number: steps.number,
    //number: stepList.length,
    stepInfo:`${input.steps}`,
    })
    
  
  }

  const handleSelect = (event) => {
    event.preventDefault()
    if(input.diet_types.length < 2){
        if(input.diet_types.length === 1){
            input.diet_types.map(e => {
                if(event.target.value === e){
                   return alert("No pueden ser del mismo tipo")
                }else{
                    setInput({
                        ...input,
                        diet_types: [...input.diet_types, event.target.value]
                    })
                }
            })
        }else{
            setInput({
                ...input,
                diet_types: [...input.diet_types, event.target.value]
            })
        }
    }else{
        return alert("2 tipos como maximo")
    }
}

const handleDeleteDiets = (e) =>{

    setInput({
        ...input,
        diet_types: input.diet_types.filter( tp => tp !== e)
    })
    
}
const handleDeleteSteps = (e) =>{
    setStepList(stepList.filter(step => step !== e))
    //steps.number= steps.number - 1
    setButtonDelete(click => click + 1)
}

const handleSubmit = (e) => {
    e.preventDefault()

    if(!Object.keys(errors).length){
        dispatch(postRecipe(info))
        setInput({
          name: "",
          image: "",
          health_score: "",
          summary: "",
          diet_types: [],
          steps: "",
        })

        setInfo({
            name: "",
            image: "",
            health_score: "",
            summary: "",
            diet_types: [],
            steps: "",
          })

        history.push("/home")
    }else{
        alert("Llena bien el formulario")
    }
  }
  
//OnCliks
const onClickAdd = () => {

    setSteps({
        number: steps.number + 1,
        //number: steps.number,
        stepInfo: `${steps.stepInfo}${input.steps[input.steps.length-1]}`,
    })

    setButton(click => click + 1)
    input.steps = ""
}

const onClickReset = () => {
    setStepList([])
}

const onClickSaveSteps = async () => {
    let finalSteps = ""
   await stepList.map(e => {
        finalSteps = finalSteps + e.stepInfo + ","
    })

    setInfo({
        ...info,
        steps: finalSteps
    })
}

const onClickSaveAll = () => {
    setInfo({
        name: input.name,
        image: input.image,
        health_score: input.health_score,
        summary: input.summary,
        diet_types: input.diet_types,
        steps: info.steps,
    })
}

//UseEffects
useEffect(() => {
     if(stepList.length === 1){
         if(steps.number === 1){
         setStepList([steps])
        }else{
            setStepList([...stepList, steps])
        }
    }
    else{
         setStepList([...stepList, steps])
    }
    
  }, [button])

useEffect(() => {
  setErrors(validate(input))
}, [input])

useEffect(() => {
   dispatch(getDiets())
}, [])

  return (
    <div className={style.container}>
        <div className={style.header}>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu receta</h1>
        </div>
        <div className={style.stats}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre de la receta: </label>
                    <input
                    type='text'
                    value={input.name}
                    name="name"
                    onChange={handleChange}
                    />
                    <p>{errors.name && errors.name}</p>
                </div>
                <div>
                    <label>Puntaje: </label>
                    <input
                    type='number'
                    value={input.health_score}
                    name="health_score"
                    onChange={handleChange}
                    />
                     <p>{errors.health_score && errors.health_score}</p>
                </div>
                <div>
                    <label>URL Image: </label>
                    <input
                    type='text'
                    value={input.image}
                    name="image"
                    onChange={handleChange}
                    />
                    <p>{errors.image && errors.image}</p>
                </div>
                
            </form>
               
                <div>
                    <label>Summary: </label>
                    <textarea
                     type='text'
                     value={input.summary}
                     name="summary"
                     onChange={handleChange}
                     className={style.textbox}
                    />
                    <p>{errors.summary && errors.summary}</p>
                </div>
                <select onChange={(e) =>handleSelect(e)}>
                    {diets.map((e) => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                </select>
                {input.diet_types.map(e => 
                <div>
                    <p>{e}</p>
                    <button onClick={() => handleDeleteDiets(e)}>x</button>
                </div>
                )}
                <button type='submit'>Crear Receta</button>
        </div>

        <div className={style.steps}>
            <p>Introduzca los pasos para su receta: </p>
                <div>
                    <label>Steps: </label>
                    <textarea
                    type='text'
                    value={input.steps}
                    name="steps"
                    //onInput={handleChangeSteps}
                    onChange={handleChangeSteps}
                    className={style.textbox}
                    />
                    {
                        <span>{info.steps}</span>
                    }
                    <p>{errors.steps && errors.steps}</p>
                </div>
                <button onClick={() => onClickAdd()}>Add Step</button>
                <button onClick={() => onClickReset()}>Reset Steps</button>
                <button onClick={() => onClickSaveSteps()}>Save steps</button>
                <button onClick={() => onClickSaveAll()}>SAVE ALL</button>
            <div className={style.showSteps}>

              {/* {stepList.length ? stepList.map(e => 
                <div>
                    <p>{e.number} {e.stepInfo}</p>
                    <h3>{stepList.length}</h3>
                </div>
                ): <span>No step list {stepList.length}</span>} */}
                  {
                    <span>{steps.number} {steps.stepInfo} </span>
                  }

                  {
                    <span> ||| Step list length :{stepList.length}</span>
                  }
                    {stepList.length ? stepList.map(e => 
                <div>
                    <span>{e.number} {e.stepInfo}</span>
                    <button onClick={() => handleDeleteSteps(e)}>x</button>
                </div>
                ): <span> ||| No step list {stepList.length}</span>} 
                   
            </div>
        </div>
        </div>
  )
}

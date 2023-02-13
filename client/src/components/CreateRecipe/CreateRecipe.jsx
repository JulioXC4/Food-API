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
  const [errors, setErrors] = useState({})

  const validate = (input) => {
    let errors = {}

        if(!input.name) errors.name = "A name is needed"
        if(input.name.length < 8) errors.name = "The name must be longer"
        if(!input.health_score ) errors.health_score ="A score is needed"
        if(input.health_score > 100) errors.health_score ="The score cannot be greater than 100"
        if(input.summary.length < 20) errors.summary = "The summary must have more than 20 letters"
        if(input.image.length < 8) errors.image = "Enter a valid url"
        if(stepList.length < 2) errors.steps = "The recipe needs 2 steps at least"

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

    if(input.diet_types.length < 5){
        if(input.diet_types.length >= 1){
            input.diet_types.map(e => {

                if(event.target.value === e){
                   alert("No pueden ser del mismo tipo")
                   return false;
                }else{
                    return true;
                }
            })
            if (!input.diet_types.includes(event.target.value)) {
                setInput({
                    ...input,
                    diet_types: [...input.diet_types, event.target.value]
                })
            }
        }else{
            setInput({
                ...input,
                diet_types: [...input.diet_types, event.target.value]
            })
        }
    }else{
        return alert("5 tipos como maximo")
    }

}

const handleDeleteDiets = (e) =>{
    setInput({
        ...input,
        diet_types: input.diet_types.filter( diet => diet !== e)
    })  
}
const handleDeleteSteps = (e) =>{
    setStepList(stepList.filter(step => step !== e))
    //steps.number= steps.number - 1
}

const handleSubmit = async(e) => {
    e.preventDefault()
    if(!Object.keys(errors).length){
        await dispatch(postRecipe(info))

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
        steps: finalSteps.slice(0, -1)
    })
    alert("Pasos guardados")
}

const onClickSaveAll = () => {
    if(!Object.keys(errors).length){

        setInfo({
            name: input.name,
            image: input.image,
            health_score: input.health_score,
            summary: input.summary,
            diet_types: input.diet_types,
            steps: info.steps,
        })

        alert("Cambios guardados")
    }else{
        return alert("rellan bn")
    }


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
     dispatch(getDiets())
    }, [])

useEffect(() => {
  setErrors(validate(input))
}, [input])

  return (
    <div className={style.container}>
        <div className={style.header}>
            <Link to='/home'><button>Home</button></Link>
            <h1 className={style.title}>Create your recipe!</h1>
            <span></span>
        </div>
        <div className={style.stats}>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={style.statsContainer}>
                    <div className={style.labelContainer}>
                        <div className={style.labelInput}>
                            <label className={style.labelName}>Recipe name</label>
                            <input
                            type='text'
                            value={input.name}
                            name="name"
                            onChange={handleChange}
                            className={style.input}
                            />
                        </div>
                        <span className={style.spanError}>{errors.name && errors.name}</span>
                    </div>
                    <div className={style.labelContainer}>
                        <div className={style.labelInput}>
                            <label className={style.labelName}>Score</label>
                            <input
                            type='number'
                            value={input.health_score}
                            name="health_score"
                            onChange={handleChange}
                            className={style.input}
                            />
                        </div>
                        <span className={style.spanError}>{errors.health_score && errors.health_score}</span>
                    </div>
                    <div className={style.labelContainer}>
                        <div className={style.labelInput}>
                        <label className={style.labelName}>URL Image</label>
                        <input
                        type='text'
                        value={input.image}
                        name="image"
                        onChange={handleChange}
                        className={style.input}
                        />
                        </div>
                        <span className={style.spanError}>{errors.image && errors.image}</span>
                    </div>
                    <div className={style.labelContainer}>
                        <div className={style.labelInput}>
                            <textarea
                             type='text'
                             value={input.summary}
                             name="summary"
                             onChange={handleChange}
                             placeholder="Write here the summary of your recipe"
                             className={style.textbox}
                            />
                        </div>
                        <span className={style.spanError}>{errors.summary && errors.summary}</span>
                    </div>
                </div>
                <div className={style.dietsContainer}>
                    <select className={style.select} onChange={(e) =>handleSelect(e)}>
                        {diets.map((e) => (
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    <div className={style.diets}>
                    {input.diet_types.map(e => 
                        <div className={style.diet}>
                            <span className={style.spanDiet}>{e}</span>
                            <button className={style.buttonClose} onClick={() => handleDeleteDiets(e)}>x</button>
                        </div>
                    )}
                    </div>
                </div>
                    <div className={style.buttonsSaveCreate}>
                        <button className={style.buttons} onClick={() => onClickSaveAll()}>SAVE ALL</button>
                        <button className={style.buttons} type='submit'>Create Recipe!</button>
                    </div>
            </form>
        </div>
        <div className={style.steps}>
            <div className={style.stepsContainer}>
                <h2 className={style.stepsName}>Enter the recipe steps:</h2>
                <div className={style.inputContainer}>
                    <textarea
                    type='text'
                    value={input.steps}
                    name="steps"
                    //onInput={handleChangeSteps}
                    onChange={handleChangeSteps}
                    placeholder="Remember to save the steps when you finish..."
                    className={style.inputSteps}
                    />
                    <span className={style.spanError}>{errors.steps && errors.steps}</span>
                </div>
                <div className={style.buttonsContainer}>
                    <button onClick={() => onClickAdd()}>Add Step</button>
                    <button onClick={() => onClickReset()}>Reset Steps</button>
                    <button onClick={() => onClickSaveSteps()}>Save steps</button>
                </div>
            </div>  
            <div className={style.showSteps}>
                <h2 className={style.stepName2}>Step List</h2>
                <div className={style.stepListContainer}>
                {stepList.length > 1 ? stepList.map((e, index) => 
                    <div className={style.step}>
                        <span className={style.spanStep}>{index+1} {e.stepInfo}</span>
                        <button className={style.buttonCloseStep} onClick={() => handleDeleteSteps(e)}>x</button>
                    </div>
                ): <span> There are no steps in the list </span>} 
                </div>
            </div>
        </div>
    </div>
  )
}

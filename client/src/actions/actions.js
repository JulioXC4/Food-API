import axios from "axios";

export const getRecipes = () => {
    return async function(dispatch){
        let recipes = await axios.get("http://localhost:3001/recipes")
        return dispatch({
            type:'GET_RECIPES',
            payload: recipes.data
        })
    }
}

export const postRecipe = (payload) => {
    return async function(dispatch){
        let response = await axios.post("http://localhost:3001/recipes", payload)

        return response	
    }

}

export const getDetails =(id) => {
    return async function (dispatch){
        let recipes = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: 'GET_DETAILS',
            payload: recipes.data
        })
    }
}

export const clearDetails = () => {
    return{
        type: 'CLEAR_DETAILS'
    }
}

export const getRecipeName = (name) => {
    return async function(dispatch){
        try{
            let recipe = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: 'GET_RECIPE_NAME',
                payload: recipe.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export const getDiets = () => {
    return async function(dispatch){
        try{
            let diets = await axios.get("http://localhost:3001/diets")
            return dispatch({
                type:'GET_DIETS',
                payload: diets.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export const filterRecipeByDiet = (payload) => {
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export const filterCreated = (payload) => {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export const orderByName = (payload) => {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export const orderByHealthPoints = (payload) => {
    return {
        type: 'ORDER_BY_HEALTH_POINTS',
        payload
    }
}

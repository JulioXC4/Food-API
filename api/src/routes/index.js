const { Router } = require('express');
const {Recipe, Diet} = require('../db.js');
const {API_KEY} = process.env;
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const apiData = await apiUrl.data
    const recipes = []

    await apiData.results.map(async (e) => {

        await recipes.push({
            name: e.title,
            img: e.image,
            dish_types: e.dishTypes,
            diet_types: e.diets,
            health_score: e.healthScore,
            summary: e.summary,
            steps: await e.analyzedInstructions[0]?.steps.map( e => {
                return {
                    number: e.number,
                    step: e.step
                } 
            }),

            //steps: await e.analyzedInstructions[0].steps ? await e.analyzedInstructions[0].steps.map( e => { return e.step}) : {return: "No steps"}
        })

    })

    return recipes
}

const getDbInfo = async() => {
    const dbRecipes = (await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    }))

    return dbRecipes
}

const getRecipes = async() => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()

    const allRecipes = apiInfo.concat(dbInfo)

    return allRecipes
}

const getDiets = async() => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    apiData = apiUrl.data
    const diets = []

    await apiData.results.map( e => {
        e.diets.map(e => {
            diets.push(e)
        })
    })

    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
    
    let diet_list = diets.filter(onlyUnique)

    return diet_list
}

router.get('/recipes', async(req, res) => {
    const {name} = req.query
    const recipes = await getRecipes()

    try {
        if(name){
            let recipe_list = await recipes.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            recipe_list.length ? res.status(200).send(recipe_list) : res.status(404).send("La receta ingresada no existe")
        }else{
            return res.json(recipes)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/diets', async(req, res) => {
    const diets = await getDiets()
    const haveDiets = await Diet.findAll()

    try {
        if(haveDiets.length === 0){
            await diets.map(async(e) => {
                await Diet.findOrCreate({
                    where:{
                        name: e,
                    }
                })
            })

            return res.status(200).send("Dietas cargadas a la base de datos")
             
        }else{
            return res.json(haveDiets)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;

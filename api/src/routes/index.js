const { Router } = require('express');
const {Recipe, Diet} = require('../db.js');
const {API_KEY} = process.env;
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    //const apiUrl = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
    const apiData = await apiUrl.data
    const recipes = []

    await apiData.results.map(async (e) => {

        await recipes.push({
            id: e.id,
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

            //(result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
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
    //const apiUrl = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
    apiData = apiUrl.data
    const diets = []

    await apiData.results.map( async (e) => {
        await e.diets.map(e => {
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

router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params
    const recipes = await getRecipes()

    try {
        if(id){
            let recipe = await recipes.filter(e => e.id == id)
            recipe.length ? res.status(200).send(recipe) : res.status(404).send("La id ingresada no es correcta")
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

router.post('/recipes', async(req, res) => {
    const {name, image, health_score, summary, diet_types, steps } = req.body

    const createRecipe = await Recipe.create({
        name: name,
        image: image,
        health_score: health_score,
        summary: summary,
        steps: steps,
        created: true
    })
    const recipeDiet = await Diet.findAll({
        where: {
            name: diet_types
        }
    })

    try {
        createRecipe.addDiet(recipeDiet)
        res.status(200).send("Recete creada con exito")
    } catch (error) {
        res.status(500).send(error)
    }

})

module.exports = router;

const initialState = {
    recipes: [],
    allRecipes: [],
    details:[],
    diets: [],
}
function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state,
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'GET_RECIPE_NAME':
            return{
                ...state,
                recipes: action.payload
            }
        case 'FILTER_BY_DIET':
            const allRecipes1 = state.allRecipes
            const recipesFiltered = action.payload === 'all' ? allRecipes1 : allRecipes1.filter(e => e.diet_types.includes(action.payload) )
            return {
                    ...state,
                    recipes: recipesFiltered
            }
        case 'CLEAR_DETAILS':
            return{
                ...state,
                details: []
            }       
        case 'FILTER_CREATED':
            const allRecipes = state.allRecipes
            const createdFilter = action.payload === 'created' ? allRecipes.filter(e => e.created === true) : allRecipes.filter(e => !e.created)
            return {
                    ...state,
                    recipes: action.payload === 'all' ? state.allRecipes: createdFilter
            }
                
        case 'ORDER_BY_NAME':
            let sortedNameArray = action.payload === 'asc' ? 
            state.recipes.sort(function(a,b){
                if(a.name > b.name) return 1
                if(b.name > a.name) return -1
    
                return 0
                }) :
                state.recipes.sort(function(a,b){
                    if(a.name > b.name) return -1
                    if(b.name > a.name) return 1
    
                    return 0
                })
    
                return {
                    ...state,
                    recipes: sortedNameArray
                }
                
        case 'ORDER_BY_HEALTH_POINTS':
            let sortedHealthPointsArray = action.payload === 'asc' ? 
                state.recipes.sort(function(a,b){
                    if(a.health_score > b.health_score) return 1
                    if(b.health_score > a.health_score) return -1
            
                    return 0
                }) :
                state.recipes.sort(function(a,b){
                    if(a.health_score > b.health_score) return -1
                    if(b.health_score > a.health_score) return 1
            
                    return 0
                    })
            
                    return {
                        ...state,
                        recipes: sortedHealthPointsArray
                    }
        default:
            return{
                ...state
            }
    }
}

export default rootReducer
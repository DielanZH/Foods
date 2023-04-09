
const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: {},
    filtered: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                filtered: action.payload
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'SEARCH_BY_NAME':
            return {
                ...state,
                recipes: action.payload,
                filtered: action.payload
            }
        case 'CREATE_RECIPE':
            return {
                ...state,
            }

        case 'GET_RECIPE_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'FILTER_BY':

            let arrayRecipes = []
            const reciReci = state.allRecipes
            if (action.payload === 'default') {
                arrayRecipes = state.allRecipes
            } else if (action.payload === 'DB') {
                arrayRecipes = reciReci.filter(p => p.createdDB)
            } else if (action.payload === 'API') {
                arrayRecipes = reciReci.filter(p => !p.createdDB)
            }
            return {
                ...state,
                recipes: arrayRecipes.length ? arrayRecipes : reciReci.concat(alert("Aún no existen Recetas creados"))
            }
        case 'ORDER_BY':
            if (action.payload === 'A-Z') {
                return {
                    ...state, recipes: [...state.recipes].sort((prev, next) => {
                        if (prev.name > next.name) return 1
                        if (prev.name < next.name) return -1
                        return 0
                    })
                }
            }
            if (action.payload === 'Z-A') {
                return {
                    ...state, recipes: [...state.recipes].sort((prev, next) => {
                        if (prev.name > next.name) return -1
                        if (prev.name < next.name) return 1
                        return 0
                    })
                }
            }
            if (action.payload === 'desc') {
                return { ...state, recipes: [...state.recipes].sort((prev, next) => prev.healthScore - next.healthScore) }
            }
            if (action.payload === 'asc') {
                return { ...state, recipes: [...state.recipes].sort((prev, next) => next.healthScore - prev.healthScore) }
            }
            else {
                return { ...state, filtered: state.recipes }
            };

        case 'FILTER_DIETS':
            const dietsFilter = action.payload === 'All' ? state.allRecipes :
                state.allRecipes.filter(el => el.diets.map(el => el).includes(action.payload))
            return {
                ...state,
                recipes: dietsFilter.length ? dietsFilter : state.recipes.concat(alert("Aún no existen recetas con ese tipo de dieta"))
            }
        case 'GET_CLEAN':
            return {
                ...state,
                detail: {}
            }

        default:
            return state;
    }
};
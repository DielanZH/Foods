import axios from 'axios';


export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getDiets() {
    return async function (dispatch) {
        return axios.get("http://localhost:3001/diets")
            .then((res) => {
                dispatch({ type: 'GET_DIETS', payload: res.data })
            })
            .catch((error) => {
                return error;
            })
    }
};

export function searchByName(name) {
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/recipes?name=${name}`)
            .then((res) => {
                dispatch({ type: 'SEARCH_BY_NAME', payload: res.data })
            })
            .catch((error) => {
                return error;
            })
    }
};

export function getRecipeDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: 'GET_RECIPE_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function createRecipe(payload) {
    return async function (dispatch) {
        const recipeCreated = await axios.post("http://localhost:3001/recipes", payload)
        return dispatch({
            type: 'CREATE_RECIPE',
            payload: recipeCreated.data
        })
    }
}


export function getClean() {
    return {
        type: 'GET_CLEAN',
    }
};

//-- FILTRADOS Y ORDENAMIENTOS --

export function orderBy(order) {
    return function (dispatch) {
        dispatch({ type: 'ORDER_BY', payload: order })
    }
};

export function filterBy(filter) {
    return function (dispatch) {
        dispatch({ type: 'FILTER_BY', payload: filter })
    }
};

export function filterDiets(diets) {
    return function (dispatch) {
        dispatch({ type: 'FILTER_DIETS', payload: diets })
    }
};
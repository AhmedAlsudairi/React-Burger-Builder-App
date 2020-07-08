import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
export const addIngredient = (ingName) => {
return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
}
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredient: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://react-my-burger-f3dd5.firebaseio.com/ingredients.json')
        .then(response=>{
             dispatch(setIngredients(response.data));
        })
           
            .catch(error=>{
                dispatch(fetchIngredientsFailed());
            });
    }
}
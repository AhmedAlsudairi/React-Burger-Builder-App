import * as actionType from '../actions/actionsTypes'


const intialState = {
    ingredient: null,
    totalPrice: 4,
    error: false
};

const ingredientPrices = {
    Salad: 0.5,
    Bacon: 0.7,
    Cheese: 0.4,
    Meat:1.3
}

const reducer = (state= intialState , action) => {
    switch(action.type){
        case( actionType.ADD_INGREDIENT) : 
        return {
            ...state,
            ingredient: {
                ...state.ingredient,
                [action.ingredientName] : state.ingredient[action.ingredientName] +1 
            },
            totalPrice: state.totalPrice + ingredientPrices[action.ingredientName]
        }
            case (actionType.REMOVE_INGREDIENT) : 
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName] : state.ingredient[action.ingredientName] -1
                },
                totalPrice: state.totalPrice - ingredientPrices[action.ingredientName]
            }

            case (actionType.SET_INGREDIENTS) : 
            return {
                ...state,
                ingredient: action.ingredient,
                error: false,
                totalPrice: 4
            }

            case (actionType.FETCH_INGREDIENTS_FAILED) : 
            return {
                ...state,
                error: true
            }
            default: 
            return state
        }
    };


export default reducer;

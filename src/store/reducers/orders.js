import * as actionType from '../actions/actionsTypes';

const intialState = {
    orders: [],
    loading: false,
    purchsed: false
} 

const reducer = (state=intialState , action) => {
    switch(action.type){
        case actionType.ORDER_INIT:
            return {
                ...state,
                purchsed: false
            }
        case actionType.ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionType.ORDER_SUCCESS:
            const newOrder= {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading:false,
                purchsed: true
            }

        case actionType.ORDER_FAIL: 
        return {
            ...state,
            loading: false
        }    

        case actionType.FETCH_ORDERS_START: 
        return {
            ...state,
            loading: true
        }

        case actionType.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case actionType.FETCH_ORDERS_FAIL: 
        return{
            ...state,
            loading: false
        }    
        default: 
        return state;
    }
}

export default reducer;
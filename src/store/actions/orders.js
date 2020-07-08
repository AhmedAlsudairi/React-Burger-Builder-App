import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const orderSuccess = (id,orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderId:id,
        orderData: orderData
    }
}

export const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error: error
    }
}

export const orderStart = () => {
    return {
        type: actionTypes.ORDER_START
    }
}
export const orderProcess = (orderData) => {
    return dispatch => {
        dispatch(orderStart());
        axios.post('/orders.json',orderData)
        .then(resonse=>{
            console.log(resonse.data);
            
           dispatch(orderSuccess(resonse.data.name,orderData));
           
        })
        .catch(error=>{
         
            dispatch(orderFail(error));
            
        });
    }
}

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT
    }
}

//

export const fetchOredersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
        
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOredersStart());

        axios.get('/orders.json')
        .then(res => {
            const fechedOrders = [];
            for(let key in res.data){
                fechedOrders.push(
                    {...res.data[key],
                        id: key} );
                        
            }
            
            dispatch(fetchOrdersSuccess(fechedOrders));
            
        })
        .catch(err=>{
            dispatch(fetchOrdersFail(err));
        });
    }
}
import React, {Component} from 'react';
import Order from '../../components/Order/Order.js';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as Actions from '../../store/actions/index';
class Orders extends Component{
   
    componentDidMount(){
        this.props.onFetchOrders();
    }
    render(){
        let orders= this.props.orders.map(order => (
            <Order 
            key={order.id} 
            ingredients={order.ingredients}
            price={order.price}/>
        ));

        if(this.props.loading){
            orders=<Spinner/>
        }
        return (
            <div >
              
              {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(Actions.fetchOrders())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
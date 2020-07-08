import React, {Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import classes from './CheckOut.css';
import ContactData from'./ContactData/ContactData';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class CheckOut extends Component{

    checkOutCanceledHandler = () =>{
        this.props.history.goBack();
    }

    checkOutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to='/'/>
        let purches=  this.props.purchsed ? <Redirect to='/'/> : null;
        if(this.props.ings){
            
            
            summary= (
                <div className={classes.CheckOut}>
                    {purches}
                <CheckOutSummary 
                ingredient={this.props.ings}
                checkoutCanceled={this.checkOutCanceledHandler}
                checkoutContinued={this.checkOutContinuedHandler} />
               <Route path='/checkout/contact-data' component={ContactData}/>
            </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        purchsed: state.orders.purchsed
    }
}

export default connect(mapStateToProps)(CheckOut);
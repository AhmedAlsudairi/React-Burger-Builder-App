import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import * as ordersActions from '../../../store/actions/index';

class ContactData extends Component {
    state={
        
       formOrder: {
        
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validaiton: {
                    required: true,
                    maxLength: 10,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            
                street: {
                    elementType: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validaiton: {
                        required: true,
                        maxLength: 10,
                    minLength: 3
                    },
                    valid: false,
                touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validaiton: {
                        required: true,
                        maxLength: 10,
                    minLength: 3
                    },
                    valid: false,
                touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: '',
                    validaiton: {
                        required: true,
                        maxLength: 10,
                    minLength: 3
                    },
                    valid: false,
                touched: false
                },
            
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validaiton: {
                    required: true,
                    maxLength: 10,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
        
        deliveryMethod: {
            elementType: 'select',
            elementConfig:{
               options: [
             {value: 'fastest', displayValue: 'Fastest'},
               {value: 'cheapest', displayValue: 'Cheapest'} ]
            },
            value: 'fastest',
            valid: true,
                touched: false,
                validaiton: {}
        },
       },
        formIsvalid:false
        
    }

    checkValidity(value, rules){
        let validity = true;

        if(rules.required){
            validity = value !== '' && validity;
        }
        if(rules.minLength){
            validity= value.length >= rules.minLength && validity;
        }
        if(rules.maxLength){
            validity= value.length <= rules.maxLength && validity;
        }

       

       

        return validity;
    }
    orderHandler = (event) =>{
        event.preventDefault();
         

         const formData = {};


         for (let formElementID in this.state.formOrder){
            formData[formElementID]=this.state.formOrder[formElementID].value;
         }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
           customer: formData
        }

        this.props.onOrderProcess(order);
     
    }

    changeHandler = (event,inputID)=> {

        const updatedFormInputElement = {
            ...this.state.formOrder[inputID]
        }

        updatedFormInputElement.value= event.target.value;
        const validity = this.checkValidity(updatedFormInputElement.value,updatedFormInputElement.validaiton);
        updatedFormInputElement.valid=validity;
        updatedFormInputElement.touched=true;
        console.log(updatedFormInputElement);
        
        const updatedFormOrder= {
            ...this.state.formOrder
        }
        
        updatedFormOrder[inputID] = updatedFormInputElement;
        
        
        let formVilidity = true;

        for(let inputID in updatedFormOrder){
            formVilidity= updatedFormOrder[inputID].valid && formVilidity;

        }


        this.setState({formOrder: updatedFormOrder, formIsvalid: formVilidity});

        
    }
    render(){

        const formArr = [];
        for(let key in this.state.formOrder){
            formArr.push({
                id: key,
                config: this.state.formOrder[key]
            })

        }


        let form = ( <form>
            
           {formArr.map(inputForm=>{
               return (
                <Input 
                key={inputForm.id} 
                elementType={inputForm.config.elementType} 
                elementConfig={inputForm.config.elementConfig} 
                value={inputForm.config.value}
                invalid={!inputForm.config.valid}
                shouldValidate={inputForm.config.validaiton}
                touched={inputForm.config.touched}
                changed={(event)=>{this.changeHandler(event,inputForm.id)}}/>
               );
           })}
            <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsvalid}>ORDER</Button>
        </form>);

        if(this.props.loading){
            form=<Spinner/>;
        }
        return(
        <div className={classes.ContactData}>
           {form}
        </div>);
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice.toFixed(2),
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderProcess: (orderData) => dispatch(ordersActions.orderProcess(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
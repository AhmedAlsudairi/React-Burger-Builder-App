import React , {Component} from 'react';
import Auxiliry from '../../../HOC/Auxiliry/Auxiliry';
import ButtonCom from '../../UI/Button/Button';

class OrderSummary extends Component {
    // const ingredientsSummary = [];
    // let i=0;
    // for (let key in props.ingredients){
    //     ingredientsSummary[i]=(<li key={key}><span style={{textTransform: "capitalize"}}>{key}</span>: {props.ingredients[key]}</li>);
    //     i++;
    // }

    componentWillUpdate(){
        console.log('[OrferSammary] willUpdate');
        
    }
    

    render(){

 const ingredientsSummary= Object.keys(this.props.ingredients)
    .map((inKey)=>{
        return (
            <li key={inKey}><span style={{textTransform: "capitalize"}}>{inKey}</span>: {this.props.ingredients[inKey]}</li>
       );
    });

         return (
        <Auxiliry>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
            {ingredientsSummary}
            </ul>
            <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
            <p>are you want to continue?</p>
            <ButtonCom btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</ButtonCom>
            <ButtonCom btnType='Success' clicked={this.props.purchaseCentinued}>CONTINUE</ButtonCom>
        </Auxiliry>
    );
    }
    
   
}

export default OrderSummary;
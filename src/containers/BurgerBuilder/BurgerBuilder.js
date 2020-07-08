import React , {Component} from 'react';
import Auxiliry from '../../HOC/Auxiliry/Auxiliry';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux'
import * as Actions from '../../store/actions/index';



class BurgerBuilder extends Component {
    constructor(propos){
        super(propos);
        this.state={
            puchaseing: false,
                       
        }
    }

    
    componentDidMount(){
        this.props.onSetupIngredients();
    }
    updateIngredient(ingredient){
        let sum=0;
        for(let key in ingredient){
            sum+=ingredient[key];
        }

        if(sum>0){
            return true;
        }else{
            return false;
        }
    }
//     addBurgerIngredient = (type) =>{
//         let oldIngredient = this.state.ingredient[type];
//         oldIngredient++;
//         let updetedIngredient={...this.state.ingredient};
//         updetedIngredient[type]=oldIngredient;

//         this.setState({ingredient: updetedIngredient});

//         let total = this.state.totalPrice;
//         total = total + ingredientPrices[type];
//         total.toFixed(2);
//         this.setState({totalPrice: total});

//         this.updateIngredient(updetedIngredient);

//    }
    
  
   
//    removeBurgerIngredient = (type) =>{
//     let oldIngredient = this.state.ingredient[type];
//     if(oldIngredient<=0){
//         return;
//     }
//     oldIngredient--;
//     let updetedIngredient={...this.state.ingredient};
//     updetedIngredient[type]=oldIngredient;

//     this.setState({ingredient: updetedIngredient});

//     let total = this.state.totalPrice;
//     total = total - ingredientPrices[type];

//     this.setState({totalPrice: total});
//     this.updateIngredient(updetedIngredient);
// }
   
    purchaseHandler = () => {
        this.setState({puchaseing:true});
    }

    purchaseCancelHandler =()=>{
        this.setState({puchaseing:false});
    } 

    purchaseCentinueHandler =()=>{
        this.props.onPurchasedInit();
       const queryParams= [];
       for (let i in this.state.ingredient){
           queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredient[i]));
       }

       queryParams.push('price='+this.state.totalPrice);
       const query= queryParams.join('&');


        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ query
        });

    } 
    render(){
        const disableLess= {...this.props.ing}

        for(let key in disableLess){
            if(disableLess[key]<=0){
                disableLess[key]=true;
            }else{
                disableLess[key]=false;
            }
        }
        
        let orderSummaryPlace= null;

        let burger=<Spinner/>

        if(this.props.ing){
            burger= (
                <Auxiliry>
            <Burger  ingredient={this.props.ing}/>                
            <BuildControls 
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disableLess}
            price={this.props.price}
            puchaseable={this.updateIngredient(this.props.ing)}
            orderd={this.purchaseHandler}/>
            </Auxiliry>);
            

orderSummaryPlace= <OrderSummary ingredients={this.props.ing}
purchaseCanceled={this.purchaseCancelHandler}
purchaseCentinued={this.purchaseCentinueHandler}
price={this.props.price} 
/>;
        }

        
      

        if(this.props.error){
            burger=  <p>the ingredients can not be loaded!</p>;
        }
        return (
            <Auxiliry>
                <Modal 
                show={this.state.puchaseing} 
                cancel={this.purchaseCancelHandler}>
               {orderSummaryPlace}
                </Modal>
               {burger}
               
            </Auxiliry>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing : state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(Actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(Actions.removeIngredient(ingName)),
        onSetupIngredients: () => dispatch(Actions.initIngredient()),
        onPurchasedInit: () => dispatch(Actions.orderInit())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
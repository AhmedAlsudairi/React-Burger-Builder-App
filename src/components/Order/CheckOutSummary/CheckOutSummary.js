import React from 'react';
import classes from './CheckOutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
const checkOutSummary = (props) => {

    return(
        <div className={classes.CheckOutSummary}>
            <h1>We hope it's taste is good</h1>

            <div style={{width:'100%' , margin: 'auto'}}>
                 <Burger ingredient={props.ingredient}  />
            </div>
           
        <Button btnType='Danger' clicked={props.checkoutCanceled}>CANCEL</Button>
        <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkOutSummary;
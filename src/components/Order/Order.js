import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const transformedIngredients=[];

    for(let ingredientName in props.ingredients){
        transformedIngredients.push(<span style={{
            display: 'inline-box',
            padding: '8px',
            margin: '0 8px',
            boxShadow: '#eee',
            border: 'solid #ccc 1px'
        }}>{ingredientName}: ({props.ingredients[ingredientName]}) </span>);
    }

    
    return(
        <div className={classes.Order}>
            <p>ingredients: {transformedIngredients}</p>
            <p>Total price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default order;
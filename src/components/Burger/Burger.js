import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{

    let transformedIngredient= Object.keys(props.ingredient)
    .map((ingredientKey)=>{
        return [...Array(props.ingredient[ingredientKey])].map((_,index)=>{
            return (
                <BurgerIngredient key={ingredientKey+index} type={ingredientKey}/>

            );
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    if(transformedIngredient.length===0){
        transformedIngredient= <p>Please start adding ingrediendts!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="BreadTop"/>
           {transformedIngredient}
            <BurgerIngredient type="BreadBottom"/>
        </div>

    );
};

export default burger;
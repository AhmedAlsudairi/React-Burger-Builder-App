import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BulidControl';
const buildControls =(props) => {
    
    const buildControlsArr= [
        { lable: 'Salad', type: 'Salad' },
        { lable: 'Bacon', type: 'Bacon' },
        { lable: 'Cheese', type: 'Cheese' },
        { lable: 'Meat', type: 'Meat' }
    ];

    return(
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {buildControlsArr.map((buildControl)=>{
                return (
                    <BuildControl
                     key={buildControl.lable} 
                     lable={buildControl.lable}
                     type={buildControl.type}
                     added={props.addIngredient}
                     removed={props.removeIngredient}
                     disabled={props.disabled[buildControl.type]}/>
                );

            })}
            <button className={classes.OrderButton} disabled={!props.puchaseable} onClick={props.orderd}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;
import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement=null;

    const cssClasses = [classes.InputElement];
    let errorMessage = null;
    if(props.shouldValidate && props.invalid && props.touched ){
        cssClasses.push(classes.Inavlid);
        errorMessage= <p style={{color: 'red'}}>please enter valid value!</p>;
    }
    switch(props.elementType){
        case('input'):
        inputElement=<input 
        className={cssClasses.join(' ')}
         {...props.elementConfig} 
         value={props.value} 
        onChange={props.changed} />;
        break;
        case('textarea'):
        inputElement=<textarea 
        className={cssClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value} 
        onChange={props.changed}/>;
        break;
        case('select'):
        inputElement=<select 
        className={cssClasses.join(' ')} 
        value={props.value} 
        onChange={props.changed}>
            {props.elementConfig.options.map(option=>(
                <option key={option.value} value={option.value}>{option.displayValue} </option>
            ))}
        </select>;
        break;
        default:
            inputElement=<input 
            className={cssClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
    }
   return( 
    <div className={classes.Input}>
        <label className={classes.Lable}>{props.lable}</label>
        {inputElement}
        {errorMessage}
    </div>
   );}

export default Input;


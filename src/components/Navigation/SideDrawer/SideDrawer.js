import React from 'react';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliry from '../../../HOC/Auxiliry/Auxiliry';

const sideDrawer =(props)=>{
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open];
    }
    return (
        <Auxiliry>
            <Backdrop show={props.open} closed={props.closed} />
             <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            
            <NavigationItems/>
        </div>
        </Auxiliry>
       
    );
}

export default sideDrawer;
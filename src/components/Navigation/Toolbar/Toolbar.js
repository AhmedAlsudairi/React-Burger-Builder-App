import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from './Menu/DrawerToggle';
const toolbar = (props) => {
   return( 
       <header className={classes.Toolbar}>
           <DrawerToggle open={props.opened}/>
           <div className={classes.Logo}>
           <Logo />
           </div>
           <nav className={classes.DesktopOnly}>
           <NavigationItems />
           </nav>
          
       </header>
   );
    
}

export default toolbar;

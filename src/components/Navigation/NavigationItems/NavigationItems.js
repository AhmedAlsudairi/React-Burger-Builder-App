import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItemV2=[
    {child:'Burger Builder'  , link: '/'},
    {child:'Orders' , link: '/orders'},
    {child:'Authenticate' , link: '/auth'},
]

const navigationItemsArr=NavigationItemV2.map((item)=>{
    return (<NavigationItem key={item.child} link={item.link} active={item.active}>{item.child}</NavigationItem>);
});

const navigationItems =(props)=>{
    return (
        <div className={classes.NavigationItems}>
            {navigationItemsArr}   
        </div>
    );
}

export default navigationItems;
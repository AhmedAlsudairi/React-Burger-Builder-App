import React from 'react';
import classes from './Logo.css';
import logoImg from '../../assets/images/logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={logoImg} alt='MyBurger'/>
    </div>
);

export default logo;
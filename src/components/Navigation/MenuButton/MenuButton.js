import React from 'react'
import classes from './MenuButton.module.css'

const MenuButton = (props) => {

    return (
        <div 
            className={classes.Menu}
            onClick={props.toggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default MenuButton;
import React from 'react'
import classes from './BurgerIngrediant.module.css';
import propTypes from 'prop-types';

const Burgeringredients = (props) => {

    let ingrediant = null;
    
    switch (props.type) {
        case ('bread-bottom'):
            ingrediant = <div className={classes.BreadBottom}></div>
            break;
    
        case ('bread-top'):
            ingrediant = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;

        case ('meat'):
            ingrediant = <div className={classes.Meat}></div>
            break;

        case ('cheese'):
            ingrediant = <div className={classes.Cheese}></div>
            break;
        
        case ('salad'):
            ingrediant = <div className={classes.Salad}></div>
            break;

        case ('bacon'):
            ingrediant = <div className={classes.Bacon}></div>
            break;
    
        default:
            ingrediant = null;
            break;
    }

    return ingrediant;
};

Burgeringredients.propTypes = {
    type: propTypes.string.isRequired
}

export default Burgeringredients;
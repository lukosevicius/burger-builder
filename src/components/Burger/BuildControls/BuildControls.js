import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) => {

    const controls = [
        {label: "Meat", type: "meat"},
        {label: "Cheese", type: "cheese"},
        {label: "Salad", type: "salad"},
        {label: "Bacon", type: "bacon"},
    ]

    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl 
                            key={ctrl.label} 
                            label={ctrl.label}
                            add={() => props.addIngredients(ctrl.type)}
                            remove={() => props.removeIngredients(ctrl.type)}
                            disabled={props.disabled[ctrl.type]}/>
            })}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
};

export default buildControls;
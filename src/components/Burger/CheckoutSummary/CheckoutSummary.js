import React from 'react'
import classes from './CheckoutSummary.module.css'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props) => {

    const summaryItems = Object.keys(props.ingredients)
            .map(key => {
                return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}: </span>{props.ingredients[key]}</li>;
            })

    return(
        <div className={classes.CheckoutSummary}>
            <h1>Summary</h1>
            <p><strong>Price: </strong>{props.price}</p>
            <p>You selected following ingredients:</p>
            <ul>
                {summaryItems}
            </ul>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" click={props.cancel}>CANCEL</Button>
            <Button btnType="Success" click={props.continue}>CONTINUE</Button>
        </div>
    )
};

export default checkoutSummary;
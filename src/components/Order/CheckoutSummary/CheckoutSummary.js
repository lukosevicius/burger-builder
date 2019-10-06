import React from 'react'
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) => {


    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger types={props.ingredients}/>
            </div>
            <Button btnType="Danger" click={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" click={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
};

export default CheckoutSummary;
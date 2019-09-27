import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

    state = {
        ingrediants:{
            salad: 1,
            cheese: 1,
            bacon: 0,
            meat: 1
        }
    }

    render(){
        return (
            <div>
                <CheckoutSummary ingrediants={this.state.ingrediants} />
            </div>
        )
    };
};

export default Checkout;
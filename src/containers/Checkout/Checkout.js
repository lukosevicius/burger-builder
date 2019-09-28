import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingrediants: {
      salad: 1,
      cheese: 1,
      bacon: 0,
      meat: 1
    }
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingrediants={this.state.ingrediants}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;

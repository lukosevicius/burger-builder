import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import CheckoutSummary from "../../components/Burger/CheckoutSummary/CheckoutSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  updatePurchaseState = ingredients => {
    let sum = Object.keys(this.props.ings)
      .map(key => {
        return this.props.ings[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      });

    return sum > 0;
  };

  componentDidMount() {
    Axios.get("https://react-burger-3a4a9.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryString = ('price=' + this.state.totalPrice);

    const queryParams = [];

    queryParams.push("price=" + this.state.totalPrice);
    for (let i in this.props.ings) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
      );
    }

    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  render() {
    let disabledControls = { ...this.props.ings };

    Object.keys(disabledControls).map(key => {
      return (disabledControls[key] = disabledControls[key] <= 0);
    });

    let burger = this.state.error ? (
      <p>Page couldn't be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger types={this.props.ings} />
          <BuildControls
            addIngredients={this.props.onIngredientAdded}
            removeIngredients={this.props.onIngredientRemoved}
            disabled={disabledControls}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );

      orderSummary = (
        <CheckoutSummary
          ingredients={this.props.ings}
          price={this.props.totalPrice}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, Axios));

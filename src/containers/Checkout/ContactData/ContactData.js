import React, { Component } from "react";

import Spinner from "../../../components/UI/Spinner/Spinner"
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Axios from "../../../axios-orders";


class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postal: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });
    
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Mantas",
        address: {
          street: "Teststreet 45",
          zip: "51514",
          country: "Lithuania"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    Axios.post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />

        <Button btnType="Success" click={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if(this.state.loading){
      form = <Spinner />;
    } 

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;

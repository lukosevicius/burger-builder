import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Logo.module.css";
import burgerLogo from "../../assets/images/burger-logo.png";

const logo = props => {
  return (
    <div className={classes.Logo}>
      <NavLink to='/'>
        <img src={burgerLogo} alt="My Burger"></img>
      </NavLink>
    </div>
  );
};

export default logo;

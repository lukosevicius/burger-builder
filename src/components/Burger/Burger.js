import React from "react";

import classes from "./Burger.module.css";
import BurgerIngrediant from "./BurgerIngrediant/BurgerIngrediant";

const burger = props => {
    
  let transformedIngredients = Object.keys(props.types)
    .map(igKey => {
      return [...Array(props.types[igKey])].map((_, i) => {
        return (
          <BurgerIngrediant key={igKey + i} type={igKey}></BurgerIngrediant>
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngrediant type="bread-top"></BurgerIngrediant>
      {transformedIngredients}
      <BurgerIngrediant type="bread-bottom"></BurgerIngrediant>
    </div>
  );
};

export default burger;

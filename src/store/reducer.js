import * as actionTypes from "./actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: {
    cheese: 0,
    meat: 0,
    bacon: 0,
    salad: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: +(
          state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        ).toFixed(2)
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: +(
          state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        ).toFixed(2)
      };

    default:
      return state;
  }
};

export default reducer;

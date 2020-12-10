import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCart = (cartItem) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: cartItem });
};

export const removeFromCart = (cartItem) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: cartItem });
};

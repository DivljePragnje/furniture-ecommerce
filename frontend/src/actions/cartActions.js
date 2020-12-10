import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCart = (cartItem) => (dispatch, getState) => {
  dispatch({ type: ADD_TO_CART, payload: cartItem });
  localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
};

export const removeFromCart = (cartItem) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: cartItem });
  localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
};

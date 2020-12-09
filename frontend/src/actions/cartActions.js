import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCart = (product, qty) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { product, qty } });
};

export const removeFromCart = (product, qty) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: { product, qty } });
};

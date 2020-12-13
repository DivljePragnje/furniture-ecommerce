import Axios from "axios";
import { EMPTY_CART } from "../constants/cartConstants";
import {
  ORDER_FAIL,
  ORDER_REQUST,
  ORDER_SUCCESS,
  SHIPPING_ADDRESS,
} from "../constants/orderConstants";

export const orderItems = (order) => async (dispatch) => {
  dispatch({ type: ORDER_REQUST });
  try {
    const response = await Axios.post("/api/orders/", order);
    dispatch({ type: ORDER_SUCCESS, payload: response.data });
    dispatch({ type: EMPTY_CART });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addShippingAddress = (address) => (dispatch, getState) => {
  dispatch({ type: SHIPPING_ADDRESS, payload: address });
  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().shippingAddress)
  );
};

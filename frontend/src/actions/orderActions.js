import Axios from "axios";
import { createSelectorHook } from "react-redux";
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
    const response = await Axios.post("/api/orders/", order, {
      headers: { Authorization: `Bearer ${order.userInfo.token}` },
    });
    dispatch({ type: ORDER_SUCCESS, payload: response.data });
    dispatch({ type: EMPTY_CART });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    const responseMail = await Axios.post("/api/orders/order-mail", order);
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

export const sendOrderMail = (order) => async (dispatch) => {
  try {
    const response = await Axios.post("/api/orders/ordermail", order);
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

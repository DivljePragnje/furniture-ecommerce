import Axios from "axios";
import {
  ORDER_FAIL,
  ORDER_REQUST,
  ORDER_SUCCESS,
} from "../constants/orderConstants";

export const orderItems = (order) => async (dispatch) => {
  dispatch({ type: ORDER_REQUST });
  try {
    const response = await Axios.post("/api/orders/", order);
    dispatch({ type: ORDER_SUCCESS, payload: response.data });
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

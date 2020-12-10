import {
  ORDER_FAIL,
  ORDER_REQUST,
  ORDER_SUCCESS,
} from "../constants/orderConstants";

export const orderReducers = (
  state = { loading: false, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_REQUST:
      return { loading: true, order: {} };
    case ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";
export const cartListReducers = (state = [], action) => {
  let itemExists = {};
  switch (action.type) {
    case ADD_TO_CART:
      itemExists = state.find(
        (el) => el.product._id === action.payload.product._id
      );
      if (itemExists) {
        itemExists.qty += action.payload.qty;
        return state.map((e) =>
          e.product === action.payload.product ? itemExists : e
        );
      } else {
        return [...state, action.payload];
      }

    case REMOVE_FROM_CART:
      itemExists = state.find(
        (el) => el.product._id === action.payload.product._id
      );
      if (itemExists) {
        itemExists.qty -= action.payload.qty;
        if (itemExists.qty <= 0) {
          return state.filter(
            (item) => item.product !== action.payload.product
          );
        } else {
          return state.map((e) =>
            e.product === action.payload.product ? itemExists : e
          );
        }
      }
      return state;
    default:
      return state;
  }
};

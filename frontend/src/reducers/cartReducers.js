import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";
export const cartListReducers = (state = [], action) => {
  let itemExists = {};
  switch (action.type) {
    case ADD_TO_CART:
      itemExists = state.find(
        (el) =>
          el._id === action.payload._id &&
          el.material === action.payload.material
      );
      if (itemExists) {
        itemExists.qty += action.payload.qty;
        return state.map((e) =>
          e._id === action.payload._id && e.material === action.payload.material
            ? itemExists
            : e
        );
      } else {
        return [...state, action.payload];
      }

    case REMOVE_FROM_CART:
      itemExists = state.find(
        (el) =>
          el._id === action.payload._id &&
          el.material === action.payload.material
      );
      if (itemExists) {
        itemExists.qty -= action.payload.qty;
        if (itemExists.qty <= 0) {
          return state.filter((item) => {
            if (
              item.material === action.payload.material &&
              item._id === action.payload._id
            ) {
              return false;
            }
            return true;
          });
        } else {
          return state.map((e) =>
            e._id === action.payload._id &&
            e.material === action.payload.material
              ? itemExists
              : e
          );
        }
      }
      return state;
    default:
      return state;
  }
};

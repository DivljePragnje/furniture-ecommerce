import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartListReducers } from "./reducers/cartReducers";
import {
  orderReducers,
  ShippingAddressReducers,
} from "./reducers/orderReducers";
import {
  ProductCreateReducer,
  ProductDeleteReducer,
  productDetailReducer,
  ProductEditReducer,
  productListReducer,
} from "./reducers/productReducers";
import { registerUserReducer, signInReducer } from "./reducers/userReducers";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},

  userDetails: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  userDetails: signInReducer,
  userRegister: registerUserReducer,
  cartItems: cartListReducers,
  orderList: orderReducers,
  shippingAddress: ShippingAddressReducers,
  productCreate: ProductCreateReducer,
  productDelete: ProductDeleteReducer,
  productEdit: ProductEditReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartListReducers } from "./reducers/cartReducers";
import { orderReducers } from "./reducers/orderReducers";
import {
  productDetailReducer,
  productListReducer,
} from "./reducers/productReducers";
import { registerUserReducer, signInReducer } from "./reducers/userReducers";
const initialState = {};

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  userDetails: signInReducer,
  userRegister: registerUserReducer,
  cartItems: cartListReducers,
  orderList: orderReducers,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;

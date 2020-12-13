import Axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_ADDING_REVIEW_REQUEST,
  PRODUCT_ADDING_REVIEW_SUCCESS,
  PRODUCT_ADDING_REVIEW_FAIL,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailProduct = (id) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAIL_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

export const addingReview = (id, review) => async (dispatch) => {
  dispatch({
    type: PRODUCT_ADDING_REVIEW_REQUEST,
  });
  try {
    const { data } = await Axios.put(`/api/products/addreview/${id}`, review);
    dispatch({ type: PRODUCT_ADDING_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ADDING_REVIEW_FAIL, payload: error.message });
  }
};

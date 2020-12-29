import Axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_ADDING_REVIEW_SUCCESS,
  PRODUCT_ADDING_REVIEW_FAIL,
  PRODUCT_ADDING_RATING_SUCCESS,
  PRODUCT_ADDING_RATING_FAIL,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
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

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userDetails: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/products/create`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.message });
  }
};

export const editProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_EDIT_REQUEST });
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userDetails: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/products/edit/${product._id}`,
      product,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_EDIT_FAIL, payload: error.message });
  }
};
export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST });
  const {
    userDetails: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/products/delete/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export const addReview = (id, review) => async (dispatch) => {
  try {
    const { data } = await Axios.put(`/api/products/addreview/${id}`, review);
    dispatch({ type: PRODUCT_ADDING_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ADDING_REVIEW_FAIL, payload: error.message });
  }
};

export const addRating = (id, rating) => async (dispatch) => {
  try {
    const { data } = await Axios.put(`/api/products/addrating/${id}`, rating);

    dispatch({ type: PRODUCT_ADDING_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ADDING_RATING_FAIL, payload: error.message });
  }
};

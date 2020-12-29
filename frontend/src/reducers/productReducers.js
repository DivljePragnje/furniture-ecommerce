const {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_ADDING_REVIEW_FAIL,
  PRODUCT_ADDING_REVIEW_SUCCESS,
  PRODUCT_ADDING_RATING_SUCCESS,
  PRODUCT_ADDING_RATING_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_RESET,
} = require("../constants/productConstants");

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state = {
    loading: true,
    product: { images: [], materials: [], reviews: [] },
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
        product: { images: [], materials: [], reviews: [] },
      };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADDING_RATING_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ADDING_RATING_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADDING_REVIEW_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ADDING_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const ProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const ProductEditReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { loading: true };
    case PRODUCT_EDIT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_EDIT_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

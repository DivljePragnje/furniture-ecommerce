const {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_ADDING_REVIEW_FAIL,
  PRODUCT_ADDING_REVIEW_REQUEST,
  PRODUCT_ADDING_REVIEW_SUCCESS,
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
    default:
      return state;
  }
};

export const productAddingReviewReducer = (
  state = {
    loading: true,
    review: {},
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_ADDING_REVIEW_REQUEST:
      return { loading: true, review: {} };
    case PRODUCT_ADDING_REVIEW_SUCCESS:
      return { loading: false, review: action.payload };
    case PRODUCT_ADDING_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

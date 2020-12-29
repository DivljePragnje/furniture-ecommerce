import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  editProduct,
  listProducts,
} from "../../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../../constants/productConstants";
import "./ProductList.styles.scss";

export default function ProductList(props) {
  const productList = useSelector((state) => state.productList);
  const productCreate = useSelector((state) => state.productCreate);
  const productDelete = useSelector((state) => state.productDelete);

  const { success: successCreate, product: createdProduct } = productCreate;
  const { success: successDelete } = productDelete;
  const { products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    dispatch(listProducts());
  }, [dispatch, successCreate, createdProduct, props.history, successDelete]);

  const editProductHandler = (id) => {
    props.history.push(`/product/${id}/edit`);
  };
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const renderProducts = () => {
    return products.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>{product.countInStock !== 0 ? product.countInStock : "-"}</td>
          <td>
            {product.onDiscount !== 0 ? product.onDiscount * 100 + "%" : "-"}
          </td>
          <td>
            <button
              className="button"
              onClick={(e) => editProductHandler(product._id)}
            >
              <div id="slide"></div>
              <span>EDIT</span>
            </button>
            <button
              className="button"
              onClick={(e) => deleteProductHandler(product._id)}
            >
              <div id="slide"></div>
              <span>DELETE</span>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="product-list">
      <button className="button" onClick={(e) => createProductHandler()}>
        <div id="slide"></div>
        <span>CREATE PRODUCT</span>
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>IN STOCK</th>
            <th>DISCOUNT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>{renderProducts()}</tbody>
      </table>
    </div>
  );
}

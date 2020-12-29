import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct, editProduct } from "../../actions/productActions";
import { PRODUCT_EDIT_RESET } from "../../constants/productConstants";
import "./EditProductScreen.styles.scss";
export default function EditProductScreen(props) {
  const productDetail = useSelector((state) => state.productDetail);
  const { product } = productDetail;
  const productEdit = useSelector((state) => state.productEdit);
  const { success: successEdit } = productEdit;
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !productDetail.product._id ||
      props.match.params.id !== productDetail.product._id
    ) {
      dispatch(detailProduct(props.match.params.id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setPrice(product.price);
      setDiscount(product.discount);
    }
    if (successEdit) {
      console.log("dsasdaasdasd");
      dispatch({ type: PRODUCT_EDIT_RESET });
    }
  }, [dispatch, props.match.params.id, productDetail.product._id]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleProductUpdate = (e) => {
    const editedProduct = {
      _id: productDetail.product._id,
      name: name,
      description: description,
      countInStock: countInStock,
      onDiscount: discount,
      category: category,
      price: price,
      reviews: productDetail.product.reviews,
      ratings: productDetail.product.ratings,
      materials: productDetail.product.materials,
      images: productDetail.product.images,
    };
    e.preventDefault();
    dispatch(editProduct(editedProduct));
  };

  return (
    <div className="edit-product-container">
      <center>
        <h2>{`PRODUCT ID: ${product._id}`}</h2>
        <form onSubmit={(e) => handleProductUpdate(e)}>
          <label>NAME</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <label>DESCRIPTION</label>
          <textarea
            placeholder="Your review"
            id="review"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          ></textarea>
          <label>PRICE</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></input>
          <label>DISCOUNT</label>
          <input
            type="number"
            required
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
          ></input>
          <label>STOCK</label>
          <input
            type="number"
            required
            value={countInStock}
            onChange={(e) => {
              setCountInStock(e.target.value);
            }}
          ></input>
          <label>CATEGORY</label>
          <input
            type="text"
            required
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          ></input>
          <button className="button">
            <div id="slide"></div>
            <span>UPDATE PRODUCT</span>
          </button>
        </form>
      </center>
    </div>
  );
}

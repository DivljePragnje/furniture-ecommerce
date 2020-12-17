import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import PriceBox from "../PriceBox";
import "./ProductItem.styles.scss";

export default function ProductItem(props) {
  const { product } = props;
  const {
    _id,
    images,
    name,
    price,
    countInStock,
    onDiscount,
    materials,
  } = product;
  const dispatch = useDispatch();

  const onAddToCart = (e) => {
    e.stopPropagation();
    const cartItem = {
      _id: _id,
      name: name,
      image: images[0],
      material: materials[0],
      price: price,
      onDiscount: onDiscount,
      qty: 1,
    };
    dispatch(addToCart(cartItem));
  };

  const renderOptional = () => {
    return countInStock === 0 ? (
      <div className="sold-out">SOLD OUT</div>
    ) : onDiscount !== 0 ? (
      <div className="on-sale">{onDiscount * 100}% DISCOUNT</div>
    ) : (
      <></>
    );
  };
  const onDetailClicked = () => {
    props.history.push(`/product/${_id}`);
  };

  return (
    <div className="product-item" onClick={onDetailClicked}>
      {renderOptional()}
      <img className="medium" src={images[0]} alt={name}></img>
      <button
        className="button-light"
        disabled={countInStock === 0}
        onClick={(e) => onAddToCart(e)}
      >
        <div id="slide"></div>
        <span>ADD TO CART</span>
      </button>
      <p className="name">{name}</p>
      <PriceBox price={price} discount={onDiscount} />
    </div>
  );
}

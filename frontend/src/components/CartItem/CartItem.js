import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import "./CartItem.styles.scss";

export default function CartItem(props) {
  const { item } = props;
  const { images, name, price, materials, onDiscount } = item.product;
  const dispatch = useDispatch();

  const removeItemFromCart = (qty) => {
    dispatch(removeFromCart(item.product, qty));
  };

  const addItemToCart = () => {
    dispatch(addToCart(item.product, 1));
  };
  return (
    <div>
      <hr />

      <div className="cart-item-container">
        <img src={images[0]} alt={item.name} />
        <div className="col">
          <p className="head-title">Name:</p>
          <p>{name}</p>
        </div>
        <div className="col">
          <p className="head-title">Price:</p>
          <p>$ {(price - onDiscount * price).toFixed(2)}</p>
        </div>
        <div className="col">
          <p className="head-title">Material:</p>
          <p>{materials[0]}</p>
        </div>
        <div className="col">
          <p className="head-title">Quantity:</p>
          <div className="qty-adder-container">
            <div className="decrease" onClick={(e) => removeItemFromCart(1)}>
              -
            </div>
            <div>{item.qty}</div>
            <div className="increase" onClick={(e) => addItemToCart(1)}>
              +
            </div>
          </div>
        </div>

        <div className="col">
          <p className="head-title">Total:</p>
          <p>$ {item.qty * (price - price * onDiscount).toFixed(2)}</p>
        </div>
        <i
          className="fa fa-trash fa-2x delete-button"
          onClick={(e) => removeItemFromCart(item.qty)}
        ></i>
      </div>
    </div>
  );
}

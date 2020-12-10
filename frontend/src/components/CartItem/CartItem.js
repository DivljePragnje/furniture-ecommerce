import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import "./CartItem.styles.scss";

export default function CartItem(props) {
  const { item } = props;
  const { image, name, price, material, onDiscount, qty } = item;
  const dispatch = useDispatch();

  const removeItemFromCart = (q) => {
    const cartItem = { ...item, qty: q };
    dispatch(removeFromCart(cartItem));
  };

  const addItemToCart = () => {
    const cartItem = { ...item, qty: 1 };
    dispatch(addToCart(cartItem));
  };
  return (
    <div>
      <hr />

      <div className="cart-item-container">
        <img src={image} alt={item.name} />
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
          <p>{material}</p>
        </div>
        <div className="col">
          <p className="head-title">Quantity:</p>
          <div className="qty-adder-container">
            <div className="decrease" onClick={(e) => removeItemFromCart(1)}>
              -
            </div>
            <div>{qty}</div>
            <div className="increase" onClick={(e) => addItemToCart(1)}>
              +
            </div>
          </div>
        </div>

        <div className="col">
          <p className="head-title">Total:</p>
          <p>$ {qty * (price - price * onDiscount).toFixed(2)}</p>
        </div>
        <i
          className="fa fa-trash fa-2x delete-button"
          onClick={(e) => removeItemFromCart(qty)}
        ></i>
      </div>
    </div>
  );
}

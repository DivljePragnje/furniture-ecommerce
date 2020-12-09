import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import "./CartScreen.styles.scss";
import { Link } from "react-router-dom";

export default function CartScreen(props) {
  const cartItems = useSelector((state) => state.cartItems);
  const renderCartItems = () => {
    return cartItems.map((item) => {
      return <CartItem key={item.product._id} item={item} />;
    });
  };

  const calculateItemsPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((element) => {
      totalPrice +=
        (element.product.price -
          element.product.price * element.product.onDiscount) *
        element.qty;
    });
    return `$ ${totalPrice.toFixed(2)}`;
  };
  return (
    <div>
      <div>
        <center>
          <h1>CART</h1>
        </center>
      </div>
      {cartItems.length === 0 ? (
        <div>
          <center>
            You don't have any items in your cart yet.
            <br />
            <Link to="/collection/all">Continue shopping</Link>
          </center>
        </div>
      ) : (
        <div>
          {renderCartItems()} <hr />
          <div className="subtotal-container">
            <h2>Subtotal: {calculateItemsPrice()}</h2>
            <button className="checkout-button">CHECKOUT</button>
          </div>
        </div>
      )}
    </div>
  );
}

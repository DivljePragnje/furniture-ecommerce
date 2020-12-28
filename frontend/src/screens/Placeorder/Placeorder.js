import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderItems } from "../../actions/orderActions";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import "./Placeorder.styles.scss";
import _ from "lodash";

export default function Placeorder(props) {
  const cartItems = useSelector((state) => state.cartItems);
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  if (!userDetails.userInfo) {
    props.history.push("/signin");
  } else {
    if (!cartItems.length === 0) {
      props.history.push("/collection/all");
    } else {
      if (_.isEmpty(shippingAddress)) {
        props.history.push("/shipping");
      }
    }
  }

  const renderCartItems = () => {
    return cartItems.map((item, index) => {
      return (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.name}></img>
          <div className="cart-description">
            <p>{item.name}</p>
            <p> Material: {item.material}</p>
            <p> Quantity: {item.qty}</p>
            <p>
              Total Price:{" "}
              <b>
                ${" "}
                {(
                  item.qty *
                  (item.price - item.price * item.onDiscount)
                ).toFixed(2)}
              </b>
            </p>
          </div>
        </div>
      );
    });
  };

  const renderItemTotal = () => {
    return cartItems.map((item, index) => {
      return (
        <div key={index} className="total-price">
          <p>
            <b>{item.name}</b> ({item.material})
          </p>
          <p>
            {item.qty} x $ {item.price.toFixed(2)} ={" "}
            <b>
              $
              {(item.qty * (item.price - item.price * item.onDiscount)).toFixed(
                2
              )}
            </b>
          </p>
        </div>
      );
    });
  };

  const onPlaceOrder = () => {
    const order = {
      userInfo: userDetails.userInfo,
      orders: cartItems,
      shippingAddress: shippingAddress,
    };
    dispatch(orderItems(order));
    props.history.push("/confirmation");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="placeorder-container">
        <div className="order-review">
          <div className="shipping-address">
            <h1>Dilivery Adress</h1>
            <div className="details">
              <p>
                Full Name: {shippingAddress.name} {shippingAddress.surname}
              </p>
              <p> Mobile Number: {shippingAddress.phone}</p>
              <p>
                Dilivery Address: {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode}
              </p>
            </div>
          </div>
          <div>
            <h1>CART</h1>
            <div className="cart-items">{renderCartItems()}</div>
          </div>
        </div>
        <div className="total-container">
          <h1>ORDER</h1>
          <div>{renderItemTotal()}</div>
          <button className="button" onClick={onPlaceOrder}>
            <div id="slide"></div>
            <span>PLACE ORDER</span>
          </button>
        </div>
      </div>
    </div>
  );
}

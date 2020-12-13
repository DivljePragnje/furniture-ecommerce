import React from "react";
import { Link } from "react-router-dom";

export default function ConfirmationScreen() {
  return (
    <div>
      <h1>Thank you for purchasing our products!</h1>
      <Link to="/collection/all">Continue shopping</Link>
    </div>
  );
}

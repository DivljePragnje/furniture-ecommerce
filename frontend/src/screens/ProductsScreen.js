import React from "react";
import ProductItem from "../components/ProductItem.js";
import { data } from "../data.js";

export default function ProductsScreen(props) {
  let items = data.products;

  if (props.location.state !== "all") {
    items = data.products.filter((item) => {
      return item.category.toLowerCase() === props.location.state.category;
    });
  }
  const renderItems = () => {
    const renderItems = items.map((item) => {
      return <ProductItem key={item._id} data={item} history={props.history} />;
    });
    return renderItems;
  };

  const getTitlePath = () => {
    return (
      "HOME / COLLECTION / " +
      props.history.location.state.category.toUpperCase()
    );
  };
  return (
    <div>
      <div>
        <center>{getTitlePath()}</center>
      </div>
      <div className="row center">{renderItems()}</div>
    </div>
  );
}

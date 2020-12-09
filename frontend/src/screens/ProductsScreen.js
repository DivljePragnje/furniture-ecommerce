import React, { useEffect } from "react";
import ProductItem from "../components/ProductItem.js";
import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../actions/productActions.js";

export default function ProductsScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  let items = products;
  const category = props.location.pathname.split("/")[2];
  if (category !== "all") {
    items = products.filter((item) => {
      return item.category.toLowerCase() === category;
    });
  }

  const renderItems = () => {
    if (loading) {
      return <LoadingBox />;
    }
    if (error) {
      return <MessageBox varient="danger">{error}</MessageBox>;
    }
    const renderItems = items.map((item) => {
      return (
        <ProductItem key={item._id} product={item} history={props.history} />
      );
    });
    return renderItems;
  };

  const getTitlePath = () => {
    return "HOME / COLLECTION / " + category.toUpperCase();
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

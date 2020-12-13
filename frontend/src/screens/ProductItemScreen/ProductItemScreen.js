import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions.js";
import { detailProduct } from "../../actions/productActions.js";
import LoadingBox from "../../components/LoadingBox.js";
import MessageBox from "../../components/MessageBox.js";
import PriceBox from "../../components/PriceBox.js";
import Rating from "../../components/Rating/Rating.js";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection.js";
import "./ProductItemScreen.styles.scss";

export default function ProductItemScreen(props) {
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const {
    _id,
    name,
    images,
    materials,
    price,
    onDiscount,
    reviews,
    description,
    countInStock,
  } = product;
  const dispatch = useDispatch();

  const [imageIndex, setImageIndex] = useState(0);
  const [material, setMaterial] = useState(materials[0]);

  const onImageClicked = (e) => {
    setImageIndex(e.target.alt);
  };
  const onAddToCart = () => {
    //TODO: Budz, ne mogu da sredim dropdown da se inicijalno racuna
    let cartItem = {};
    if (typeof material === "undefined") {
      cartItem = {
        _id: _id,
        name: name,
        image: images[0],
        material: materials[0],
        price: price,
        onDiscount: onDiscount,
        qty: 1,
      };
    } else {
      cartItem = {
        _id: _id,
        name: name,
        image: images[0],
        material: material,
        price: price,
        onDiscount: onDiscount,
        qty: 1,
      };
    }

    dispatch(addToCart(cartItem));
  };

  useEffect(() => {
    dispatch(detailProduct(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const renderGallery = () => {
    const renderImages = images.map((image, index) => {
      return (
        <img
          key={index}
          className="image-small col-3"
          src={image}
          alt={index}
          onClick={(e) => onImageClicked(e)}
        ></img>
      );
    });
    return <div className="row-image"> {renderImages} </div>;
  };

  const renderOption = () => {
    return materials.map((m, index) => {
      return (
        <option key={index} value={`${m}`}>
          {m}
        </option>
      );
    });
  };

  if (loading) {
    return <LoadingBox />;
  }
  if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  }

  return (
    <div>
      <div className="row-container">
        <div className="col-2">
          <img className="image-large" src={images[imageIndex]} alt={name} />
          {renderGallery()}
        </div>

        <div className="col-1">
          <div className="row ">
            <p className="title">{name}</p>
            <Rating reviews={reviews} />
          </div>

          <PriceBox price={price} discount={onDiscount} />
          <div className="select">
            <label forhtml="materials">Material:</label>

            <select
              name="materials"
              id="materials"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              {renderOption()}
            </select>
          </div>

          <p className="description">{description}</p>
          <button
            type="button"
            className="primary"
            disabled={countInStock === 0}
            onClick={onAddToCart}
          >
            ADD TO CART
          </button>
          <ReviewsSection productId={props.match.params.id} reviews={reviews} />
        </div>
      </div>
    </div>
  );
}

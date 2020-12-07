import React, { useState } from "react";
import PriceBox from "../../components/PriceBox.js";
import Rating from "../../components/Rating.js";
import { data } from "../../data.js";
import "./ProductItemScreen.styles.scss";

export default function ProductItemScreen(props) {
  const item = data.products.find((i) => i._id === props.match.params.id);
  const [image, setImage] = useState(item.images[0]);
  const onImageClicked = (e) => {
    setImage(e.target.currentSrc);
  };

  const renderGallery = () => {
    const renderImages = item.images.map((image, index) => {
      return (
        <img
          key={index}
          className="image-small col-3"
          src={image}
          alt={item.name}
          onClick={(e) => onImageClicked(e)}
        ></img>
      );
    });
    return <div className="row-image"> {renderImages} </div>;
  };

  const renderOption = () => {
    return item.materials.map((material, index) => {
      return (
        <option key={index} value={`${material}`}>
          {material}
        </option>
      );
    });
  };

  return (
    <div>
      <div className="row-container">
        <div className="col-2">
          <img className="image-large" src={image} alt={item.name} />
          {renderGallery()}
        </div>

        <div className="col-1">
          <div className="row ">
            <p className="title">{item.name}</p>
            <Rating rating={item.rating} numReviews={item.numReviews} />
          </div>

          <PriceBox price={item.price} discount={item.onDiscount} />
          <div className="select">
            <label forhtml="materials">Material:</label>

            <select name="materials" id="materials">
              {renderOption()}
            </select>
          </div>

          <p className="description">{item.description}</p>
          <button
            type="button"
            className="primary"
            disabled={item.countInStock === 0}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct, editProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { PRODUCT_EDIT_RESET } from "../../constants/productConstants";
import "./EditProductScreen.styles.scss";
import { MATERIALS } from "../../constants/globals.js";
import Axios from "axios";

export default function EditProductScreen(props) {
  const productDetail = useSelector((state) => state.productDetail);
  const { product } = productDetail;
  const productEdit = useSelector((state) => state.productEdit);
  const { success: successEdit } = productEdit;
  const { userInfo } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !productDetail.product._id ||
      props.match.params.id !== productDetail.product._id
    ) {
      dispatch(detailProduct(props.match.params.id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setPrice(product.price);
      setDiscount(product.onDiscount * 100);
      setMaterials(product.materials);
    }
    if (successEdit) {
      dispatch({ type: PRODUCT_EDIT_RESET });
    }
  }, [dispatch, props.match.params.id, productDetail.product._id]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");
  const [materials, setMaterials] = useState([]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const handleProductUpdate = (e) => {
    const editedProduct = {
      _id: productDetail.product._id,
      name: name,
      description: description,
      countInStock: countInStock,
      onDiscount: discount / 100,
      category: category,
      price: price,
      reviews: productDetail.product.reviews,
      ratings: productDetail.product.ratings,
      materials: materials,
      images: images,
    };
    e.preventDefault();
    dispatch(editProduct(editedProduct));
  };
  const onUploadFile = async (e) => {
    const bodyFormData = new FormData();

    for (var i = 0; i < e.target.files.length; i++) {
      bodyFormData.append("images", e.target.files[i]);
    }
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImages(data);
      setLoadingUpload(false);
      setErrorUpload("");
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  const onCheckboxHandler = (material) => {
    const foundMaterial = materials.find((m) => m === material);
    if (foundMaterial !== undefined) {
      setMaterials(materials.filter((el) => el !== material));
    } else {
      setMaterials([...materials, material]);
    }
  };

  const renderMaterialCheckbox = () => {
    return MATERIALS.map((material, index) => {
      const foundMaterial = materials.find((m) => m === material);

      return (
        <div key={index}>
          <input
            type="checkbox"
            id={material}
            name={material}
            checked={foundMaterial !== undefined ? true : false}
            onChange={(e) => onCheckboxHandler(material)}
          />
          <label>{material.toUpperCase()}</label>
        </div>
      );
    });
  };

  return (
    <div className="edit-product-container">
      <center>
        <h2>{`PRODUCT ID: ${product._id}`}</h2>
        <form onSubmit={(e) => handleProductUpdate(e)}>
          <label>NAME</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <label>DESCRIPTION</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          ></textarea>
          <div>
            <label>IMAGES</label>
            <input
              type="file"
              name="images"
              onChange={onUploadFile}
              multiple
            ></input>
            {loadingUpload && <LoadingBox></LoadingBox>}
            {errorUpload && (
              <MessageBox variant="danger">{errorUpload}</MessageBox>
            )}
          </div>
          <label>PRICE</label>
          <input
            type="number"
            required
            min="1"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></input>
          <label>DISCOUNT</label>
          <input
            type="number"
            required
            min="0"
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
          ></input>
          <label>STOCK</label>
          <input
            type="number"
            required
            min="0"
            value={countInStock}
            onChange={(e) => {
              setCountInStock(e.target.value);
            }}
          ></input>
          <label>CATEGORY</label>
          <input
            type="text"
            required
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          ></input>
          MATERIALS
          <div className="materials">{renderMaterialCheckbox()}</div>
          <button className="button">
            <div id="slide"></div>
            <span>UPDATE PRODUCT</span>
          </button>
        </form>
      </center>
    </div>
  );
}

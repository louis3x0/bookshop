import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "../../helpers/admin";
import { isAuthenticated } from "../../helpers/isAuthenticated";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CreateProduct = () => {
  const [catshow, setcatShow] = useState(false);

  const handlecatClose = () => setcatShow(false);
  const handlecatShow = () => setcatShow(true);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",

    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <>
      <Link onClick={handlecatShow} className="link-items">
        Create product
      </Link>
      <Modal
        className="modal-content-product"
        show={catshow}
        onHide={handlecatClose}
      >
        <form className="form-list" onSubmit={clickSubmit}>
          <div className="">
            <label className="c-product">Create product</label>
            <form className="form-group">
              <input
                type="text"
                onChange={handleChange("name")}
                className="form-control"
                placeholder="Name"
                value={name}
              />
            </form>

            <form className="form-group">
              <input
                type="number"
                placeholder="Price"
                onChange={handleChange("price")}
                className="form-control"
                value={price}
              />
            </form>

            <form className="form-group">
              <select
                placeholder="Category"
                onChange={handleChange("category")}
                className="select-form"
              >
                <option>Select category</option>
                {categories &&
                  categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </form>

            <form className="form-group">
              <select
                placeholder="Shipping"
                onChange={handleChange("shipping")}
                className="select-form"
              >
                <option placeholder="Shipping">Select shipping</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </form>
            <form>
              <input
                onChange={handleChange("quantity")}
                type="number"
                placeholder="Enter quantity"
                id="tentacles"
                name="tentacles"
                className="input-quantity"
                min="10"
                max="100"
                value={quantity}
              />
            </form>
            <form>
              <textarea
                onChange={handleChange("description")}
                className="form-control f-description"
                value={description}
              />
            </form>
            <form className="form-group">
              {" "}
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
                className="photo photo-btn"
              />
            </form>
            <div className="button-list">
              <button
                className="btn btn-outline-primary float-right btn-create button-category
          "
              >
                Create
              </button>
              <Button
                onClick={handlecatClose}
                className="btn btn-outline-primary button-category"
              >
                Close
              </Button>
            </div>
          </div>
        </form>
        {showError()}
        {showSuccess()}
        {showLoading()}
      </Modal>
    </>
  );

  const showError = () => (
    <div className="alert" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert color-new"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} has been created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return <>{newPostForm()}</>;
};

export default CreateProduct;

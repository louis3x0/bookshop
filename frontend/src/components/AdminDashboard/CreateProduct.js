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
      <Link onClick={handlecatShow}>Create product</Link>
      <Modal show={catshow} onHide={handlecatClose}>
        <form onSubmit={clickSubmit}>
          <h4>Post Photo</h4>
          <div className="form-group">
            <label className="btn btn-secondary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
              />
            </label>
          </div>

          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea
              onChange={handleChange("description")}
              className="form-control"
              value={description}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Price</label>
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              value={price}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Category</label>
            <select
              onChange={handleChange("category")}
              className="form-control"
            >
              <option>Please select</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Shipping</label>
            <select
              onChange={handleChange("shipping")}
              className="form-control"
            >
              <option>Please select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Quantity</label>
            <input
              onChange={handleChange("quantity")}
              type="number"
              className="form-control"
              value={quantity}
            />
          </div>

          <Link
            to="/admin/dashboard"
            className="btn btn-outline-warning float-left"
          >
            Back
          </Link>
          <button className="btn btn-outline-primary float-right mb-3">
            Create
          </button>
        </form>
        {showError()}
        {showSuccess()}
        {showLoading()}
      </Modal>
    </>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
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

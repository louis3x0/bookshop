import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCategory } from "../../helpers/admin";
import { isAuthenticated } from "../../helpers/isAuthenticated";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [catshow, setcatShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlecatClose = () => setcatShow(false);
  const handlecatShow = () => setcatShow(true);
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const showSuccess = () => {
    if (success)
      return <h3 className="alert color-new">{name} has been created!</h3>;
  };

  const showError = () => {
    if (error) return <h3 className="alert">{error}</h3>;
  };

  const newCategoryForm = () => (
    <>
      <Link className="c-products" onClick={handlecatShow}>
        Create category
      </Link>
      <Modal show={catshow} onHide={handlecatClose}>
        <form className="form-category" onSubmit={clickSubmit}>
          <div className="">
            <label htmlFor="" className="c-category">
              Create category
            </label>
            <input
              type="text"
              className="form-control modal-form"
              autoFocus
              value={name}
              onChange={handleChange}
              required
              placeholder="Category name"
            />
          </div>
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
          {showSuccess()}
          {showError()}
        </form>
      </Modal>
    </>
  );

  return <>{newCategoryForm()}</>;
};

export default CreateCategory;

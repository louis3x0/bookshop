import React, { useState } from "react";
import { isAuthenticated } from "../../helpers/isAuthenticated";
import { Link } from "react-router-dom";
import { signout } from "../../helpers/auth";
import money from "../../assets/money.svg";
import people from "../../assets/63615.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  const [show, setShow] = useState(false);
  const [catshow, setcatShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlecatClose = () => setcatShow(false);
  const handlecatShow = () => setcatShow(true);

  const adminNav = () => {
    return (
      <nav class="navbar nav-dash justify-content-between">
        <Link className="dashboard link-items" to="/">
          Dashboard
        </Link>
        <Link
          to="/login"
          className="nav-logout link-items"
          onClick={() => signout()}
        >
          Sign Out
        </Link>
      </nav>
    );
  };

  const Modals = () => {
    return (
      <>
        <Link className="c-products link-items" onClick={handleShow}>
          Create products
        </Link>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal headings</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const CatModals = () => {
    return (
      <>
        <Link className="link-items" onClick={handlecatShow}>
          Create category
        </Link>
        <Modal show={catshow} onHide={handlecatClose}>
          <div className="modal-header modal-h" closeButton>
            <h5 className="modal-title modal-t">Create category</h5>
          </div>
          <div className="modal-body">
            Woohoo, you're reading this text in a modal!
          </div>
          <button variant="secondary" onClick={handlecatClose}>
            Close
          </button>
          <button variant="primary" onClick={handlecatClose}>
            Save Changes
          </button>
        </Modal>
      </>
    );
  };
  const adminInfo = () => {
    return (
      <div>
        <div className="greeting-container row">
          <img src={money} alt="" className="money" srcset="" />
          <div className="greetings">
            <p className="name">Hello {name}</p>
            <span className="greet-description">
              {" "}
              Welcome to your dashboard.
            </span>
          </div>
        </div>
        <div class="card card-info">
          <div class="card-body">
            <h5 class="card-title title-information">User information</h5>
            <div className="user-info">
              <span>Name: {name}</span>
              <span>Email: {email}</span>
              <span>
                {" "}
                Role:&nbsp;{role === 1 ? "Admin" : "Registered User"}
              </span>
            </div>
          </div>
        </div>
        <div className="admin-links">
          <CreateCategory />
          <CreateProduct />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="admin-container">
        {adminNav()}
        <div className="">{adminInfo()}</div>
      </div>
    </>
  );
};

export default AdminDashboard;

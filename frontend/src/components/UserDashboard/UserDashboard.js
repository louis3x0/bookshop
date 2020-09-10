import React, { useState } from "react";
import { isAuthenticated } from "../../helpers/isAuthenticated";
import { Link } from "react-router-dom";
import { signout } from "../../helpers/auth";
import camping from "../../assets/camping.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UserDashboard = () => {
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

  const adminInfo = () => {
    return (
      <div>
        <div className="greeting-container row">
          <img src={camping} className="money camping" alt="" srcset="" />
          <div className="greetings">
            <p className="name name-user">Hello {name}</p>
            <span className="greet-description">
              {" "}
              Welcome to your dashboard.
            </span>
          </div>
        </div>
        <div class="card card-info">
          <div class="card-body c-bg">
            <h5 class="card-title title-information t-c">User information</h5>
            <div className="user-info inf-user">
              <span>Name: {name}</span>
              <span>Email: {email}</span>
              <span>
                {" "}
                Role:&nbsp;{role === 1 ? "Admin" : "Registered User"}
              </span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="card">
            <div class="card-body m-left">
              <h5 class="card-title new-title">User links</h5>
              <p class="card-text new-text">
                Here you will find user links that you will need to edit profile
                and to see your cart.
              </p>
              <div className="btn-container">
                <a href="#" class="btn btn-primary b-edit">
                  My cart
                </a>
                <a href="#" class="btn btn-primary b-edit b-2">
                  Update profile
                </a>
              </div>
            </div>
          </div>

          <div class="card new-c col-lg-12 col-xl-12 col-sm-12 col-md-12">
            <div class="card-body text-content">
              <h5 class="card-title new-title">Purchase history</h5>
              <p class="card-text new-text">History.</p>
            </div>
          </div>
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
export default UserDashboard;

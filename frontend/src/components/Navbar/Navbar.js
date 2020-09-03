import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../helpers/isAuthenticated";
import { signout } from "../../helpers/auth";
import logo from "../../assets/logo.png";

const Navbar = ({ history }) => {
  const isActive = (path) => {
    if (history.location.pathname === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="" className="nav-image" srcset="" />
      </Link>{" "}
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link" style={isActive("/")}>
              Home
            </Link>
          </li>

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  style={isActive("/register")}
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  style={isActive("/login")}
                >
                  Sign In
                </Link>
              </li>
            </>
          )}
          {/* User Links */}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  style={isActive("/signout")}
                  onClick={() => signout()}
                >
                  Sign Out
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/user/dashboard"
                  className="nav-link"
                  style={isActive("/user/dashboard")}
                >
                  {isAuthenticated().user.name}
                </Link>
              </li>
            </>
          )}
          {/* Admin Links */}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              <li className="nav-item">
                <Link
                  to="/admin/dashboard"
                  className="nav-link"
                  style={isActive("/admin/dashboard")}
                >
                  {isAuthenticated().user.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  style={isActive("/signout")}
                  onClick={() => signout()}
                >
                  Sign Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
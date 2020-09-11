import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../helpers/isAuthenticated";
import { signout } from "../../helpers/auth";
import logo from "../../assets/logo.png";
import MobileMenu from "./MobileMenu";

const Navbar = ({ history }) => {
  return (
    <header className="headerz">
      <div className="headerz__wrapper">
        <a href="" className="headerz__logo">
          <img src={logo} alt="" class="headerz__logo-image" />
        </a>
        <div className="headerz__right">
          <input
            type="text"
            name="movie-title"
            id="search"
            class="headerz__search headerz__link"
            placeholder="Quick search"
          />
          <nav className="nav-items">
            <a href="" class="headerz__link">
              Home
            </a>
            <a href="" class="headerz__link">
              4K
            </a>
            <a href="" class="headerz__link">
              Trending
            </a>
            <a href="" class="headerz__link">
              Browse books
            </a>
            <Link to="/login" class=" headerz__link headerz__auth-link">
              Login
            </Link>
            <Link to="/register" class="headerz__link headerz__auth-link d-n">
              Register
            </Link>
            <MobileMenu />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navbar);

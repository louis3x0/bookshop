import React, { useState } from "react";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!isOpen)}
        className={`hamburger-button ${isOpen ? "open" : "close"}`}
      />
      <div className={`panel ${isOpen ? "open" : "close"}`}>
        <a href="" class="menu-link">
          Home
        </a>
        <a href="" class="menu-link">
          Trending
        </a>
        <a href="" class="menu-link">
          Browse books
        </a>
        <div className="login-container">
          <Link to="/login" class="headerz__auth-link d-n">
            Login
          </Link>
          <Link to="/register" class="headerz__auth-link d-n">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

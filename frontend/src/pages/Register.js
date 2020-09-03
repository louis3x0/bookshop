import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../helpers/auth";
import logo from "../assets/logo.png";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    register({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <div className="row justify-content-center move-t">
      <div className="">
        <form>
          <div className="form-group">
            <label className="text-muted"></label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
              placeholder="Name"
            />
          </div>

          <div className="form-group">
            <label className="text-muted"></label>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              value={email}
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label className="text-muted"></label>
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              value={password}
              placeholder="Password"
            />
          </div>
          <Link className="mt-4 text-end forgot">Forgot password?</Link>
          <button
            onClick={clickSubmit}
            className="btn btn-primary float-right mt-3 login-b"
          >
            Sign Up
          </button>
          {showError()}
        </form>
      </div>
    </div>
  );

  const showError = () => (
    <div className="alert" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert color-new" style={{ display: success ? "" : "none" }}>
      Account created with success{" "}
      <Link to="/login" className="log-please">
        Please log in.
      </Link>
    </div>
  );

  return (
    <div className="container ">
      <div className="wrapper">
        <img src={logo} alt="" className="rounded mx-auto d-block" />
        <h1 className="login mt-3">Register</h1>
        <p class="overview">
          <tt>\EpicBook</tt> get your account now and start explore.
        </p>

        {signUpForm()}
        {showSuccess()}
        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link className="member" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

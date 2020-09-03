import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, authenticate } from "../helpers/auth";
import loader from "../assets/831.svg";
import logo from "../assets/logo.png";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToRefferer: false,
  });

  const { email, password, error, loading, redirectToRefferer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToRefferer: true,
          });
        });
      }
    });
  };

  const loginForm = () => (
    <div className="row justify-content-center move-t">
      <form>
        <div className="form-group">
          <label className="text-muted"></label>
          <input
            onChange={handleChange("email")}
            type="text"
            className="form-control"
            value={email}
            placeholder="Email address"
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
        <a className="mt-4 forgot" href="">
          Forgot password?
        </a>
        <button
          onClick={clickSubmit}
          className="btn btn-primary float-right mt-3 login-b"
        >
          Submit
        </button>
        {showError()}
      </form>
    </div>
  );

  const showError = () => (
    <div className="alert " style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert">
        <img className="loader col-lg-12" src={loader} alt="" srcset="" />
      </div>
    );

  const redirectUser = () => {
    if (redirectToRefferer) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div className="container ">
      <div className="wrapper">
        <img src={logo} alt="" className="rounded mx-auto d-block" />
        <h1 className="login mt-3">Log in to get started</h1>
        <p class="overview">
          <tt>\EpicBook</tt> is a place where you can get free books.
        </p>

        {showLoading()}
        {loginForm()}
        {redirectUser()}

        <p className="text-center mt-5">
          Not a member?{" "}
          <Link className="member" to="/register">
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
